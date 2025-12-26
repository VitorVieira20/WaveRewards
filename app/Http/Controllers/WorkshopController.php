<?php

namespace App\Http\Controllers;

use App\Enums\LogType;
use App\Services\BadgeService;
use App\Services\WorkshopService;
use App\Traits\LogsActivity;
use Exception;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkshopController extends Controller
{
    use LogsActivity;

    public function __construct(
        protected WorkshopService $workshopService,
        protected BadgeService $badgeService
    ) {
    }


    public function index()
    {
        $workshops = $this->workshopService->getWorkshops();

        return Inertia::render("Authenticated/Workshops/Index", [
            'workshops' => $workshops
        ]);
    }


    public function show(int $id)
    {
        $workshop = $this->workshopService->getWorkshopById($id, Auth::id());

        return Inertia::render("Authenticated/Workshops/Show", [
            'workshop' => $workshop
        ]);
    }


    public function registerUser(int $workshopId)
    {
        $user = Auth::user();

        try {
            $this->workshopService->registerUser($workshopId, $user->id);

            $newBadges = $this->badgeService->checkAchievements($user);

            $response = back()->with('registered', 'Inscrição realizada com sucesso! Vemo-nos lá.');

            $this->logActivity("Utilizador registado no workshop", LogType::WORKSHOPS, [
                'user_id' => $user->id,
                'workshop_id' => $workshopId
            ]);

            if (!empty($newBadges)) {
                $this->logActivity("Nova(s) conquista(s) desbloqueada(s)", LogType::ACHIEVEMENTS, ['badges' => $newBadges]);

                return $response->with('new_badge', $newBadges);
            }

            return $response;

        } catch (Exception $e) {
            return back()->with('error', 'Não foi possível realizar a inscrição.');
        }
    }
}
