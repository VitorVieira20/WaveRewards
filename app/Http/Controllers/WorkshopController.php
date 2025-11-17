<?php

namespace App\Http\Controllers;

use App\Services\WorkshopService;
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
        $workshop = $this->workshopService->getWorkshopById($id);

        return Inertia::render("Authenticated/Workshops/Show", [
            'workshop' => $workshop
        ]);
    }
}
