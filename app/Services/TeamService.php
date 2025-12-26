<?php

namespace App\Services;

use App\Jobs\SendDiscordTeamApprovalJob;
use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TeamService
{
    public function allTeams()
    {
        return Team::where('status', 'approved')
            ->withCount([
                'users' => function ($query) {
                    $query->where('team_user.status', 'approved');
                }
            ])
            ->withSum([
                'users' => function ($query) {
                    $query->where('team_user.status', 'approved');
                }
            ], 'total_points')
            ->get()
            ->map(fn($team) => [
                'id' => $team->id,
                'name' => $team->name,
                'description' => $team->description,
                'image' => $team->image ? asset('storage/' . $team->image) : null,
                'users_count' => $team->users_count,
                'users_sum_total_points' => $team->users_sum_total_points ?? 0,
                'created_at' => $team->created_at,
            ]);
    }


    public function myTeam(User $user)
    {
        return $user->teams()
            ->where('teams.status', 'approved')
            ->wherePivot('status', 'approved')
            ->with([
                'users' => function ($query) {
                    $query->wherePivot('status', 'approved')
                        ->withPivot('role', 'status');
                }
            ])
            ->first();


    }


    public function pendingTeam(User $user)
    {
        return $user->teams()
            ->where('teams.status', 'pending')
            ->wherePivot('role', 'admin')
            ->first();
    }


    public function canUserCreateTeam(User $user): bool
    {
        return !$this->myTeam($user) && !$this->pendingTeam($user);
    }


    public function userHasApprovedTeam(User $user): bool
    {
        return $user->teams()->wherePivot('status', 'approved')->exists();
    }


    public function userHasPendingRequest(User $user): bool
    {
        return $user->teams()->wherePivot('status', 'pending')->exists();
    }


    public function createTeam(User $user, array $data, $imageFile = null)
    {
        $imagePath = $imageFile ? $imageFile->store('teams-images', 'public') : null;

        $team = Team::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'image' => $imagePath,
            'status' => 'pending',
            'invite_code' => Str::random(16)
        ]);

        $team->users()->attach($user->id, [
            'role' => 'admin',
            'status' => 'approved'
        ]);

        SendDiscordTeamApprovalJob::dispatch($user, $team);

        return $team;
    }


    public function join(User $user, Team $team)
    {
        $team->users()->attach($user->id, [
            'role' => 'member',
            'status' => 'pending'
        ]);
    }


    public function getPendingRequests(Team $team): array
    {
        return $team->users()
            ->wherePivot('status', 'pending')
            ->get()
            ->map(fn($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'avatar' => $member->avatar ? asset($member->avatar) : null,
                'role' => $member->pivot->role,
                'status' => $member->pivot->status,
                'points' => $member->total_points
            ])->toArray();
    }


    public function formatTeamDetail($team)
    {
        $teamTotalPoints = $team->users->sum('total_points');

        $ranking = Team::withSum('users', 'total_points')
            ->orderByDesc('users_sum_total_points')
            ->pluck('id')
            ->search($team->id) + 1;

        return [
            'id' => $team->id,
            'name' => $team->name,
            'description' => $team->description ?? null,
            'image' => $team->image ? asset('storage/' . $team->image) : null,
            'points' => $teamTotalPoints,
            'rank' => $ranking,
            'role' => $team->pivot->role,
            'invite_code' => $team->invite_code,
            'members' => $team->users->map(function ($member) {
                return [
                    'id' => $member->id,
                    'name' => $member->name,
                    'avatar' => $member->avatar ? asset($member->avatar) : null,
                    'role' => $member->pivot->role,
                    'status' => $member->pivot->status,
                    'points' => $member->total_points
                ];
            }),
        ];
    }


    public function approveRequest(User $admin, User $targetUser): void
    {
        $team = $this->getAdminTeam($admin);

        if (!$team) {
            throw new \Exception('Não tens permissão para gerir esta equipa.');
        }

        DB::transaction(function () use ($team, $targetUser) {
            $team->users()->updateExistingPivot($targetUser->id, [
                'status' => 'approved',
                'updated_at' => now(),
            ]);

            $targetUser->teams()->wherePivot('status', 'pending')->detach();

            $targetUser->teams()
                ->where('teams.status', 'pending')
                ->wherePivot('role', 'admin')
                ->get()
                ->each(fn($pTeam) => $pTeam->delete());
        });
    }


    public function rejectRequest(User $admin, User $targetUser): void
    {
        $team = $this->getAdminTeam($admin);

        if (!$team || !$team->users()->where('user_id', $targetUser->id)->wherePivot('status', 'pending')->exists()) {
            throw new \Exception('Pedido não encontrado ou sem permissão.');
        }

        $team->users()->detach($targetUser->id);
    }


    public function processUserDeparture(User $user, ?int $newAdminId = null): string
    {
        $team = $user->teams()->wherePivot('status', 'approved')->first();

        if (!$team) {
            throw new \Exception('Não pertences a nenhuma equipa.');
        }

        $isAdmin = $team->pivot->role === 'admin';

        if ($isAdmin) {
            $adminsCount = $team->users()->wherePivot('role', 'admin')->wherePivot('status', 'approved')->count();

            if ($adminsCount === 1) {
                $otherMembersCount = $team->users()->wherePivot('status', 'approved')->where('users.id', '!=', $user->id)->count();

                if ($otherMembersCount > 0) {
                    if (!$newAdminId) {
                        throw new \Exception('Precisas de nomear um novo administrador antes de sair.');
                    }
                    $team->users()->updateExistingPivot($newAdminId, ['role' => 'admin']);
                } else {
                    $team->delete();
                    return 'Saíste e a equipa foi eliminada por já não ter membros.';
                }
            }
        }

        $team->users()->detach($user->id);
        return 'Saíste da equipa com sucesso.';
    }


    public function kickMember(User $admin, User $member): void
    {
        $team = $this->getAdminTeam($admin);

        if (!$team) {
            throw new \Exception('Não tens permissões de administrador.');
        }

        if ($admin->id === $member->id) {
            throw new \Exception('Não podes expulsar-te a ti próprio. Usa a opção de sair.');
        }

        $team->users()->detach($member->id);
    }


    public function getInviteData(string $code)
    {
        $team = Team::where('invite_code', $code)->where('status', 'approved')->firstOrFail();

        $ranking = Team::withSum(['users' => fn($q) => $q->where('team_user.status', 'approved')], 'total_points')
            ->orderByDesc('users_sum_total_points')
            ->pluck('id')
            ->search($team->id) + 1;

        return [
            'id' => $team->id,
            'name' => $team->name,
            'description' => $team->description,
            'rank' => $ranking,
            'image' => $team->image ? asset('storage/' . $team->image) : null,
            'points' => (int) $team->users()->wherePivot('status', 'approved')->sum('total_points'),
            'members_count' => $team->users()->wherePivot('status', 'approved')->count(),
        ];
    }


    private function getAdminTeam(User $admin): ?Team
    {
        return $admin->teams()
            ->wherePivot('role', 'admin')
            ->wherePivot('status', 'approved')
            ->first();
    }
}