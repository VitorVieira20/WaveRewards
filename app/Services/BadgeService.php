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
}