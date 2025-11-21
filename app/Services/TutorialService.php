<?php

namespace App\Services;

use App\Models\Tutorial;
use App\Repositories\TutorialRepository;
use Illuminate\Support\Collection;

class TutorialService
{
    public function __construct(protected TutorialRepository $tutorialRepository)
    {
    }


    public function getTutorials(): Collection
    {
        $tutorials = $this->tutorialRepository->getAll();

        return $tutorials->map(function ($tutorial) {
            return $this->formatTutorial($tutorial);
        });
    }


    public function getTutorialById(int $id): array|null
    {
        $tutorial = $this->tutorialRepository->findById($id);

        if (!$tutorial) {
            return null;
        }

        return $this->formatTutorial($tutorial);
    }


    private function formatTutorial(Tutorial $tutorial): array
    {
        return [
            'id' => $tutorial->id,
            'thumbnail' => asset($tutorial->thumbnail),
            'title' => $tutorial->title,
            'url' => $tutorial->url,
        ];
    }
}