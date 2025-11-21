<?php

namespace App\Services;

use App\Models\Workshop;
use App\Repositories\WorkshopRepository;
use Illuminate\Support\Collection;

class WorkshopService
{
    public function __construct(protected WorkshopRepository $workshopRepository)
    {
    }


    public function getWorkshops(): Collection
    {
        $workshops = $this->workshopRepository->getAll();

        return $workshops->map(function ($workshop) {
            return $this->formatWorkshop($workshop);
        });
    }


    public function getWorkshopById(int $id): array|null
    {
        $workshop = $this->workshopRepository->findById($id);

        if (!$workshop) {
            return null;
        }

        return $this->formatWorkshop($workshop);
    }


    private function formatWorkshop(Workshop $workshop): array
    {
        return [
            'id' => $workshop->id,
            'image' => asset($workshop->image),
            'title' => $workshop->title,
            'description' => $workshop->description,
            'location' => $workshop->location,
            'datetime' => $workshop->schedule->format('d/m - H:i') . 'h',
            'registered_count' => $workshop->users_count ?? 0,
            'created_at' => $workshop->created_at,
        ];
    }
}