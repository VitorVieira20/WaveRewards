<?php

namespace App\Http\Controllers;

use App\Jobs\SendDiscordTeamApprovalJob;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Inertia\Inertia;

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
                    $query->where('status', 'approved');
                }
            ])
            ->withSum('users', 'total_points')
            ->paginate(9);

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
        $team->users()->attach(Auth::id(), ['role' => 'member', 'status' => 'pending']);
        return back();
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

        $targetUser = $team->users()
            ->where('user_id', $user->id)
            ->wherePivot('status', 'pending')
            ->first();

        if (!$targetUser) {
            return back()->withErrors(['error' => 'Este pedido já não existe.']);
        }

        $team->users()->updateExistingPivot($user->id, [
            'status' => 'approved',
            'updated_at' => now(),
        ]);

        return back()->with('success', 'Membro aceite na equipa!');
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