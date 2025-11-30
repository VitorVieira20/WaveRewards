<?php

namespace App\Http\Controllers;

use App\Services\WorkshopService;
use Exception;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkshopController extends Controller
{
    public function __construct(protected WorkshopService $workshopService)
    {
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
        try {
            $this->workshopService->registerUser($workshopId, Auth::id());

            return back()->with('registered', 'Inscrição realizada com sucesso! Vemo-nos lá.');

        } catch (Exception $e) {
            return back()->with('error', 'Não foi possível realizar a inscrição.');
        }
    }
}
