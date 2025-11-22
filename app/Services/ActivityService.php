<?php

namespace App\Services;

use App\Enums\ActivityCategory;
use App\Enums\ActivityLevel;
use App\Models\Activity;
use App\Repositories\ActivityRepository;
use Illuminate\Support\Collection;

class ActivityService
{
    public function __construct(protected ActivityRepository $activityRepository)
    {
    }


    public function getActivities(): Collection
    {
        $activities = $this->activityRepository->getAll();

        return $activities->map(function ($activity) {
            return $this->formatActivity($activity);
        });
    }


    public function getActivitiesByCategory(string $category): Collection
    {
        $activities = $this->activityRepository->findByCategory($category);

        return $activities->map(function ($activity) {
            return $this->formatActivity($activity);
        });
    }


    public function getActivityById(int $id): array|null
    {
        $activity = $this->activityRepository->findById($id);

        if (!$activity) {
            return null;
        }

        return $this->formatActivity($activity);
    }


    public function getCategories(): array
    {
        return ActivityCategory::values();
    }


    public function getLevels(): array
    {
        return ActivityLevel::values();
    }



    private function formatActivity(Activity $activity): array
    {
        return [
            'id' => $activity->id,
            'title' => $activity->title,
            'images' => collect($activity->images ?? [])->map(fn($img) => asset($img))->toArray(),
            'description' => $activity->description,
            'duration' => $activity->duration,
            'material' => $activity->material,
            'benefits' => $activity->benefits,
            'location' => $activity->location,
            'datetime' => $activity->datetime ? $activity->datetime->format('d/m/Y H:i') : null,
            'category' => $activity->category instanceof ActivityCategory ? $activity->category->value : $activity->category,
            'level' => $activity->level instanceof ActivityLevel ? $activity->level->value : $activity->level,
            'registered_count' => $activity->users_count ?? 0,

        ];
    }
}