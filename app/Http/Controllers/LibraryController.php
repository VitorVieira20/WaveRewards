<?php

namespace App\Http\Controllers;

use App\Services\InformationService;
use App\Services\TutorialService;
use App\Services\WorkshopService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LibraryController extends Controller
{
    public function __construct(
        protected WorkshopService $workshopService,
        protected TutorialService $tutorialService,
        protected InformationService $informationService
    ) {
    }
    public function index()
    {
        $workshops = $this->workshopService->getWorkshops();
        $tutorials = $this->tutorialService->getTutorials();
        $informations = $this->informationService->getInformations();

        return Inertia::render("Authenticated/Library", [
            'workshops' => $workshops,
            'tutorials' => $tutorials,
            'informations' => $informations
        ]);
    }
}
