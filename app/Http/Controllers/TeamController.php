<?php

namespace App\Http\Controllers;

use App\Jobs\SendDiscordTeamApprovalJob;
use App\Models\Team;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $myTeam = $user->teams()
            ->where('teams.status', 'approved')
            ->wherePivot('status', 'approved')
            ->first();

        if ($myTeam)
            return redirect()->route('teams.myTeam');

        $pendingTeam = $user->teams()
            ->where('teams.status', 'pending')
            ->wherePivot('role', 'admin')
            ->first();

        $canCreate = !$pendingTeam;

        $allTeams = Team::where('status', 'approved')
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
            ->paginate(9)
            ->through(fn($team) => [
                'id' => $team->id,
                'name' => $team->name,
                'description' => $team->description,
                'image' => $team->image ? asset('storage/' . $team->image) : null,
                'users_count' => $team->users_count,
                'users_sum_total_points' => $team->users_sum_total_points ?? 0,
                'created_at' => $team->created_at,
            ]);

        return Inertia::render('Authenticated/Teams/Index', [
            'canCreate' => $canCreate,
            'allTeams' => $allTeams,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $myTeam = $user->teams()->wherePivot('status', 'approved')->first();

        if ($myTeam)
            return redirect()->back()->with('error', 'Já pertence a uma equipa');

        $pendingTeam = $user->teams()
            ->where('teams.status', 'pending')
            ->wherePivot('role', 'admin')
            ->first();

        if ($pendingTeam)
            return redirect()->back()->with('error', 'Não pode criar mais que uma equipa!');

        $request->validate([
            'name' => 'required|string|max:255|unique:teams',
            'description' => 'nullable|string|max:500',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('teams-images', 'public');
        }

        $team = Team::create([
            'name' => $request->name,
            'description' => $request->description,
            'image' => $imagePath,
            'status' => 'pending'
        ]);

        $team->users()->attach($user->id, [
            'role' => 'admin',
            'status' => 'approved'
        ]);

        $this->sendDiscordNotification($team, $user);

        return back()->with('success', 'Equipa criada com sucesso! Aguarda aprovação.');
    }

    public function join(Team $team)
    {
        $user = Auth::user();

        $alreadyInTeam = $user->teams()
            ->wherePivot('status', 'approved')
            ->exists();

        if ($alreadyInTeam) {
            return back()->with('error', 'Já pertences a uma equipa.');
        }

        $hasPendingRequest = $user->teams()
            ->wherePivot('status', 'pending')
            ->exists();

        if ($hasPendingRequest) {
            return back()->with('error', 'Já tens um pedido de adesão pendente.');
        }

        $team->users()->attach($user->id, [
            'role' => 'member',
            'status' => 'pending'
        ]);

        return back()->with('success', 'Pedido de adesão enviado com sucesso! Aguarda a aprovação do capitão.');
    }


    public function myTeam()
    {
        $user = FacadesAuth::user();

        $myTeam = $user->teams()
            ->where('teams.status', 'approved')
            ->wherePivot('status', 'approved')
            ->with([
                'users' => function ($query) {
                    $query->wherePivot('status', 'approved')
                        ->withPivot('role', 'status');
                }
            ])
            ->first();

        if (!$myTeam)
            return redirect()->route('dashboard.index');

        $pendingRequests = [];

        if ($myTeam && $myTeam->pivot->role === 'admin') {
            $pendingRequests = $myTeam->users()
                ->wherePivot('status', 'pending')
                ->get()
                ->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'name' => $member->name,
                        'avatar' => $member->avatar ? asset($member->avatar) : null,
                        'role' => $member->pivot->role,
                        'status' => $member->pivot->status,
                        'points' => $member->total_points
                    ];
                });
        }

        return Inertia::render('Authenticated/Teams/MyTeam', [
            'myTeam' => $this->formatTeamData($myTeam),
            'pendingRequests' => $pendingRequests
        ]);
    }


    public function acceptRequest(User $user)
    {
        $admin = Auth::user();

        $team = $admin->teams()
            ->wherePivot('role', 'admin')
            ->first();

        if (!$team) {
            return back()->withErrors(['error' => 'Não tens permissão para gerir esta equipa.']);
        }

        $targetRequest = $team->users()
            ->where('user_id', $user->id)
            ->wherePivot('status', 'pending')
            ->first();

        if (!$targetRequest) {
            return back()->withErrors(['error' => 'Este pedido já não existe.']);
        }

        DB::beginTransaction();

        try {
            $team->users()->updateExistingPivot($user->id, [
                'status' => 'approved',
                'updated_at' => now(),
            ]);

            $user->teams()->wherePivot('status', 'pending')->detach();

            $pendingTeamsToCreate = $user->teams()
                ->where('teams.status', 'pending')
                ->wherePivot('role', 'admin')
                ->get();

            foreach ($pendingTeamsToCreate as $pTeam) {
                $pTeam->delete();
            }

            DB::commit();
            return back()->with('success', 'Membro aceite e pedidos duplicados limpos!');

        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Ocorreu um erro ao processar o pedido. Tenta novamente.']);
        }
    }

    public function rejectRequest(User $user)
    {
        $admin = Auth::user();
        $team = $admin->teams()
            ->wherePivot('role', 'admin')
            ->first();

        if (!$team) {
            return back()->withErrors(['error' => 'Não tens permissão.']);
        }

        $exists = $team->users()
            ->where('user_id', $user->id)
            ->wherePivot('status', 'pending')
            ->exists();

        if (!$exists) {
            return back()->withErrors(['error' => 'Pedido não encontrado.']);
        }

        $team->users()->detach($user->id);

        return back()->with('success', 'Pedido rejeitado.');
    }


    public function leave(Request $request)
    {
        $user = Auth::user();
        $team = $user->teams()->wherePivot('status', 'approved')->first();

        if (!$team) {
            return back()->with('error', 'Não pertences a nenhuma equipa.');
        }

        $isAdmin = $team->pivot->role === 'admin';

        if ($isAdmin) {
            $adminsCount = $team->users()
                ->wherePivot('role', 'admin')
                ->wherePivot('status', 'approved')
                ->count();

            if ($adminsCount === 1) {
                $otherMembersCount = $team->users()
                    ->wherePivot('status', 'approved')
                    ->where('users.id', '!=', $user->id)
                    ->count();

                if ($otherMembersCount > 0) {
                    $request->validate([
                        'new_admin_id' => 'required|exists:users,id'
                    ], [
                        'new_admin_id.required' => 'Precisas de nomear um novo administrador antes de sair.'
                    ]);

                    $team->users()->updateExistingPivot($request->new_admin_id, [
                        'role' => 'admin'
                    ]);
                } else {
                    $team->delete();
                    return redirect()->route('teams.index')->with('success', 'Saíste e a equipa foi eliminada por já não ter membros.');
                }
            }
        }

        // Caso não seja o último admin ou seja apenas membro, sai normalmente
        $team->users()->detach($user->id);

        return redirect()->route('teams.index')->with('success', 'Saíste da equipa com sucesso.');
    }


    public function kick(User $member)
    {
        $admin = Auth::user();

        $team = $admin->teams()
            ->wherePivot('role', 'admin')
            ->wherePivot('status', 'approved')
            ->first();

        if (!$team) {
            return back()->with('error', 'Não tens permissões de administrador.');
        }

        if ($admin->id === $member->id) {
            return back()->with('error', 'Não podes expulsar-te a ti próprio. Usa a opção de sair.');
        }

        $team->users()->detach($member->id);

        return back()->with('success', "{$member->name} foi removido da equipa.");
    }


    private function formatTeamData($team)
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


    private function sendDiscordNotification($team, $user)
    {
        $imageUrl = $team->image ? asset('storage/' . $team->image) : null;

        $payload = [
            "content" => "🚀 **Novo pedido de criação de equipa!**",
            "embeds" => [
                [
                    "title" => "Equipa: " . $team->name,
                    "description" => $team->description ?? "Sem descrição.",
                    "color" => 1935292,
                    "fields" => [
                        [
                            "name" => "👤 Criador",
                            "value" => $user->name,
                            "inline" => true
                        ],
                        [
                            "name" => "🆔 ID da Equipa",
                            "value" => (string) $team->id,
                            "inline" => true
                        ]
                    ],
                    "image" => $imageUrl ? ["url" => $imageUrl] : null,
                    "footer" => [
                        "text" => "WaveRewards Admin • ID: " . $team->id
                    ],
                    "timestamp" => now()->toIso8601String()
                ]
            ],
            "components" => [
                [
                    "type" => 1,
                    "components" => [
                        [
                            "type" => 2,
                            "style" => 3,
                            "label" => "Aprovar",
                            "custom_id" => "approve_team_{$team->id}"
                        ],
                        [
                            "type" => 2,
                            "style" => 4,
                            "label" => "Rejeitar",
                            "custom_id" => "reject_team_{$team->id}"
                        ]
                    ]
                ]
            ]
        ];

        SendDiscordTeamApprovalJob::dispatch($payload);
    }
}