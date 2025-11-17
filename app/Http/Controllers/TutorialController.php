<?php

namespace App\Http\Controllers;

use App\Services\TutorialService;
use Inertia\Inertia;

class TutorialController extends Controller
{
    public function __construct(protected TutorialService $tutorialService)
    {
    }


    public function index()
    {
        $workshops = $this->tutorialService->getTutorials();

        return Inertia::render("Authenticated/Tutorials/Index", [
            'tutorials' => $workshops
        ]);
    }


    public function show(int $id)
    {
        $tutorial = $this->tutorialService->getTutorialById($id);

        return Inertia::render("Authenticated/Tutorials/Show", [
            'tutorial' => $tutorial
        ]);
    }
}
