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
        $tutorials = $this->tutorialService->getTutorials();

        return Inertia::render("Authenticated/Tutorials/Index", [
            'tutorials' => $tutorials
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
