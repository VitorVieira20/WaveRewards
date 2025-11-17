<?php

namespace App\Http\Controllers;

use App\Services\ActivityService;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function __construct(protected ActivityService $activitiesService)
    {
    }


    public function index()
    {
        $activities = $this->activitiesService->getActivities();
        $categories = $this->activitiesService->getCategories();

        return Inertia::render("Authenticated/Activities/Index", [
            'activities' => $activities,
            'categories' => $categories
        ]);
    }


    public function indexByCategory(string $category)
    {
        $activities = $this->activitiesService->getActivitiesByCategory($category);

        return Inertia::render("Authenticated/Activities/IndexByCategory", [
            'activities' => $activities
        ]);
    }


    public function show(int $id)
    {
        $activity = $this->activitiesService->getActivityById($id);

        return Inertia::render("Authenticated/Activities/Show", [
            'activity' => $activity
        ]);
    }
}
