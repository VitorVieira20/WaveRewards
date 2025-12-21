<?php

namespace App\Services;

use App\Enums\ActivityCategory;
use App\Enums\ActivityLevel;
use App\Models\Activity;
use App\Models\ActivityUser;
use App\Models\User;
use App\Repositories\ActivityRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

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


    public function getUserActivities(User $user)
    {
        $rawActivities = $user->activities()
            ->orderByPivot('created_at', 'desc')
            ->take(2)
            ->get()
            ->map(fn($activity) => [
                'id' => $activity->id,
                'date' => $activity->pivot->created_at->translatedFormat('d M Y - H:i'),
                'title' => $activity->title,
                'distance' => round($activity->pivot->distance / 1000, 1) . ' km',
                'duration' => $activity->pivot->practice_time . ' min',
                'points' => $activity->pivot->points,
                'calories' => $activity->pivot->wasted_calories . ' kcal',
            ]);

        return $rawActivities;
    }


    public function getUserGlobalStats(User $user)
    {
        return ActivityUser::where('user_id', $user->id)
            ->selectRaw('
            sum(distance) as total_dist,
            sum(wasted_calories) as total_cal,
            sum(points) as total_pts,
            count(*) as total_count,
            sum(practice_time) as total_time,
            sum(trash_collected) as total_trash
        ')
            ->first();
    }


    public function getUserStats($globalStats)
    {
        return [
            'total_distance' => round(($globalStats->total_dist ?? 0) / 1000, 1),
            'total_calories' => (int) $globalStats->total_cal,
            'total_points' => (int) $globalStats->total_pts,
            'total_activities' => (int) $globalStats->total_count,
            'total_hours' => round(($globalStats->total_time ?? 0) / 60, 1),
            'total_trash' => $globalStats->total_trash ?? 0,
        ];
    }


    public function getChartData(User $user)
    {
        $weekly = DB::table('activity_user')
            ->where('user_id', $user->id)
            ->where('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE_FORMAT(created_at, "%d/%m") as name, SUM(points) as valor')
            ->groupBy('name')
            ->orderBy(DB::raw('MIN(created_at)'), 'asc')
            ->get();

        $monthly = DB::table('activity_user')
            ->where('user_id', $user->id)
            ->where('created_at', '>=', now()->subMonth())
            ->selectRaw('DATE_FORMAT(created_at, "Semana %u") as name, SUM(points) as valor')
            ->groupBy('name')
            ->orderBy(DB::raw('MIN(created_at)'), 'asc')
            ->get();

        $yearly = DB::table('activity_user')
            ->where('user_id', $user->id)
            ->where('created_at', '>=', now()->startOfYear())
            ->selectRaw('DATE_FORMAT(created_at, "%M") as name, SUM(points) as valor')
            ->groupBy('name')
            ->orderBy(DB::raw('MIN(created_at)'), 'asc')
            ->get();

        return [
            'semana' => $weekly,
            'mes' => $monthly,
            'ano' => $yearly
        ];
    }


    public function exportUserData(User $user)
    {
        $activityService = app(ActivityService::class);
        $globalStats = $activityService->getUserGlobalStats($user);
        $formattedStats = $activityService->getUserStats($globalStats);

        $allActivities = DB::table('activity_user')
            ->leftJoin('activities', 'activity_user.activity_id', '=', 'activities.id')
            ->where('activity_user.user_id', $user->id)
            ->select(
                'activity_user.*',
                'activities.title as base_title'
            )
            ->orderBy('activity_user.performed_at', 'desc')
            ->get();

        $data = [
            'user' => $user,
            'stats' => $formattedStats,
            'workshops' => $user->workshops()->withPivot('created_at')->get(),
            'activities' => $allActivities,
            'badges' => $user->badges()->get(),
            'generated_at' => now()->format('d/m/Y H:i')
        ];

        return Pdf::loadView('pdf.user_data', $data);
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
            'registered_count' => $activity->unique_users_count ?? 0,
            'is_liked' => $activity->is_liked,
        ];
    }
}