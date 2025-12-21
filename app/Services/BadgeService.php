<?php

namespace App\Services;

use App\Models\User;
use App\Models\Badge;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BadgeService
{
    public function checkAchievements(User $user): array
    {
        $newlyAwarded = [];

        $stats = DB::table('activity_user')
            ->where('user_id', $user->id)
            ->selectRaw('
                SUM(distance) as total_meters, 
                SUM(wasted_calories) as total_calories, 
                SUM(trash_collected) as total_trash, 
                SUM(practice_time) as total_minutes,
                COUNT(*) as total_activities
            ')
            ->first();

        $workshopCount = $user->workshops()->count();
        Log::debug("Total de workshops inscritos: {$workshopCount}");

        $earnedBadgeIds = $user->badges()->pluck('badge_id')->toArray();
        $potentialBadges = Badge::whereNotIn('id', $earnedBadgeIds)->get();


        foreach ($potentialBadges as $badge) {
            $hasReachedRequirement = false;
            $currentValue = 0;

            switch ($badge->category) {
                case 'distance':
                    $currentValue = ($stats->total_meters ?? 0) / 1000;
                    $hasReachedRequirement = $currentValue >= $badge->requirement_value;
                    break;
                case 'trash':
                    $currentValue = ($stats->total_trash ?? 0) / 1000;
                    $hasReachedRequirement = $currentValue >= $badge->requirement_value;
                    break;
                case 'workshops':
                    $currentValue = $workshopCount;
                    $hasReachedRequirement = $currentValue >= $badge->requirement_value;
                    break;
                case 'calories':
                    $currentValue = $stats->total_calories ?? 0;
                    $hasReachedRequirement = $currentValue >= $badge->requirement_value;
                    break;
                case 'time':
                    $currentValue = $stats->total_minutes ?? 0;
                    $hasReachedRequirement = $currentValue >= $badge->requirement_value;
                    break;
                case 'activities':
                    $currentValue = $stats->total_activities ?? 0;
                    $hasReachedRequirement = $currentValue >= $badge->requirement_value;
                    break;
            }

            if ($hasReachedRequirement) {
                $user->badges()->attach($badge->id, ['created_at' => now()]);

                $badge->image = asset($badge->image);

                $newlyAwarded[] = $badge;
            }
        }

        return $newlyAwarded;
    }


    public function getUpcomingAchievements(User $user, $globalStats)
    {
        $earnedBadgeIds = $user->badges()->pluck('badge_id');

        $workshopCount = $user->workshops()->count();

        return Badge::whereNotIn('id', $earnedBadgeIds)
            ->orderBy('requirement_value', 'asc')
            ->get()
            ->groupBy('category')
            ->map(fn($group) => $group->first())
            ->take(3)
            ->map(function ($badge) use ($globalStats, $workshopCount) {
                $currentValue = match ($badge->category) {
                    'distance' => ($globalStats->total_dist ?? 0) / 1000,
                    'calories' => $globalStats->total_cal ?? 0,
                    'trash' => $globalStats->total_trash ?? 0,
                    'time' => $globalStats->total_time ?? 0,
                    'activities' => $globalStats->total_count ?? 0,
                    'workshops' => $workshopCount,
                    default => 0,
                };

                $percentage = min(round(($currentValue / $badge->requirement_value) * 100), 100);

                return [
                    'id' => $badge->id,
                    'name' => $badge->name,
                    'category' => $badge->category,
                    'current' => round($currentValue, 1),
                    'target' => $badge->requirement_value,
                    'percentage' => $percentage,
                    'tier' => $badge->tier
                ];
            })->values();
    }


    public function getRecentAchievements(User $user)
    {
        return $user->badges()
            ->orderByPivot('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(fn($badge) => [
                'name' => $badge->name,
                'image' => asset($badge->image),
                'tier' => $badge->tier,
                'date' => $badge->pivot->created_at->translatedFormat('d M Y')
            ]);
    }


    public function getMedals(User $user)
    {
        $badgeData = DB::table('badge_user')
            ->join('badges', 'badge_user.badge_id', '=', 'badges.id')
            ->where('badge_user.user_id', $user->id)
            ->select('badges.tier', 'badges.image')
            ->selectRaw('count(*) as total')
            ->groupBy('badges.tier', 'badges.image')
            ->get();

        $medals = [
            'gold' => ['count' => 0, 'image' => asset('images/medals/gold.png')],
            'silver' => ['count' => 0, 'image' => asset('images/medals/silver.png')],
            'bronze' => ['count' => 0, 'image' => asset('images/medals/bronze.png')],
        ];

        foreach ($badgeData as $row) {
            if (isset($medals[$row->tier])) {
                $medals[$row->tier]['count'] = $row->total;
                $medals[$row->tier]['image'] = asset($row->image);
            }
        }

        return $medals;
    }


    public function getAllEarnedBadges(User $user)
    {
        return $user->badges()
            ->orderByPivot('created_at', 'desc')
            ->get()
            ->map(fn($badge) => [
                'name' => $badge->name,
                'description' => $badge->description,
                'image' => asset($badge->image),
                'tier' => $badge->tier,
                'date' => $badge->pivot->created_at->translatedFormat('d M Y')
            ])
            ->groupBy('tier');
    }
}