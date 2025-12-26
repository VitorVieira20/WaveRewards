<?php

namespace App\Http\Controllers;

use App\Enums\LogType;
use App\Http\Requests\Team\CreateTeamRequest;
use App\Jobs\SendDiscordTeamApprovalJob;
use App\Models\Team;
use App\Models\User;
use App\Services\TeamService;
use App\Traits\LogsActivity;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeamController extends Controller
{
    use LogsActivity;

    public function __construct(protected TeamService $teamService)
    {
    }


    public function index()
    {
        $user = Auth::user();

        if ($this->teamService->myTeam($user)) {
            return redirect()->route('teams.myTeam');
        }

        return Inertia::render('Authenticated/Teams/Index', [
            'canCreate' => $this->teamService->canUserCreateTeam($user),
            'allTeams' => $this->teamService->allTeams()
        ]);
    }


    public function store(CreateTeamRequest $request)
    {
        $user = Auth::user();

        if ($this->teamService->userHasApprovedTeam($user)) {
            return back()->with('error', 'Já pertence a uma equipa');
        }

        if ($this->teamService->pendingTeam($user)) {
            return back()->with('error', 'Não pode criar mais que uma equipa!');
        }

        $team = $this->teamService->createTeam($user, $request->validated(), $request->file('image'));

        $this->logActivity("Criação de nova equipa (Pendente)", LogType::TEAMS, [
            'team_id' => $team->id,
            'team_name' => $team->name
        ]);

        return back()->with('success', 'Equipa criada com sucesso! Aguarda aprovação.');
    }


    public function join(Team $team)
    {
        $user = Auth::user();

        if ($this->teamService->userHasApprovedTeam($user)) {
            return back()->with('error', 'Já pertences a uma equipa.');
        }

        if ($this->teamService->userHasPendingRequest($user)) {
            return back()->with('error', 'Já tens um pedido de adesão pendente.');
        }

        $this->teamService->join($user, $team);

        $this->logActivity("Pedido de adesão enviado", LogType::TEAMS, [
            'team_id' => $team->id,
            'team_name' => $team->name
        ]);

        return back()->with('success', 'Pedido de adesão enviado com sucesso! Aguarda a aprovação do capitão.');
    }


    public function myTeam()
    {
        $user = Auth::user();

        $myTeam = $this->teamService->myTeam($user);

        if (!$myTeam) {
            return redirect()->route('dashboard.index');
        }

        $pendingRequests = [];
        if ($myTeam->pivot->role === 'admin') {
            $pendingRequests = $this->teamService->getPendingRequests($myTeam);
        }

        return Inertia::render('Authenticated/Teams/MyTeam', [
            'myTeam' => $this->teamService->formatTeamDetail($myTeam),
            'pendingRequests' => $pendingRequests
        ]);
    }


    public function acceptRequest(User $user)
    {
        try {
            $this->teamService->approveRequest(Auth::user(), $user);

            $this->logActivity("Admin aceitou novo membro na equipa", LogType::TEAMS, [
                'member_id' => $user->id,
                'member_name' => $user->name
            ]);

            return back()->with('success', 'Membro aceite e pedidos duplicados limpos!');
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    public function rejectRequest(User $user)
    {
        try {
            $this->teamService->rejectRequest(Auth::user(), $user);

            $this->logActivity("Admin rejeitou pedido de adesão", LogType::TEAMS, [
                'rejected_user_id' => $user->id
            ]);

            return back()->with('success', 'Pedido rejeitado.');
        } catch (Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    public function leave(Request $request)
    {
        try {
            $message = $this->teamService->processUserDeparture(Auth::user(), $request->new_admin_id);

            $this->logActivity("Utilizador saiu da equipa", LogType::TEAMS, [
                'new_admin_id' => $request->new_admin_id ?? null
            ]);

            return redirect()->route('teams.index')->with('success', $message);
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function kick(User $member)
    {
        try {
            $this->teamService->kickMember(Auth::user(), $member);

            $this->logActivity("Membro expulso da equipa", LogType::TEAMS, [
                'kicked_user_id' => $member->id,
                'kicked_user_name' => $member->name
            ]);

            return back()->with('success', "{$member->name} foi removido da equipa.");
        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }


    public function showInvite($code)
    {
        $inviteData = $this->teamService->getInviteData($code);

        return Inertia::render('Authenticated/Teams/InviteLanding', [
            'team' => $inviteData,
            'alreadyInTeam' => $this->teamService->userHasApprovedTeam(Auth::user()),
        ]);
    }
}