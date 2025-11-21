<?php

namespace App\Services;

use App\Models\Information;
use App\Repositories\InformationRepository;
use Illuminate\Support\Collection;

class InformationService
{
    public function __construct(protected InformationRepository $informationRepository)
    {
    }


    public function getInformations(): Collection
    {
        $informations = $this->informationRepository->getAll();

        return $informations->map(function ($information) {
            return $this->formatInformation($information);
        });
    }


    public function getInformationById(int $id): array|null
    {
        $information = $this->informationRepository->findById($id);

        if (!$information) {
            return null;
        }

        return $this->formatInformation($information);
    }


    private function formatInformation(Information $information): array
    {
        return [
            'id' => $information->id,
            'title' => $information->title,
            'image' => asset($information->image),
            'description' => $information->description,
            'curiosity' => $information->curiosity,
        ];
    }
}