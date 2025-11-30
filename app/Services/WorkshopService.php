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


    public function getWorkshopById(int $id, ?int $userId = null): array|null
    {
        $workshop = $this->workshopRepository->findById($id);

        if (!$workshop) {
            return null;
        }

        return $this->formatWorkshop($workshop, $userId);
    }


    public function registerUser(int $workshopId, int $userId): void
    {
        $workshop = $this->workshopRepository->findById($workshopId);

        if ($workshop) {
            $workshop->users()->syncWithoutDetaching([$userId]);
        }
    }


    private function formatWorkshop(Workshop $workshop, ?int $userId = null): array
    {
        $isRegistered = false;

        if ($userId) {
            $isRegistered = $workshop->users()->where('user_id', $userId)->exists();
        }

        return [
            'id' => $workshop->id,
            'image' => asset($workshop->image),
            'title' => $workshop->title,
            'description' => $workshop->description,
            'location' => $workshop->location,
            'datetime' => $workshop->schedule->format('d/m - H:i') . 'h',
            'registered_count' => $workshop->users_count ?? 0,
            'is_registered' => $isRegistered,
            'created_at' => $workshop->created_at,
        ];
    }
}