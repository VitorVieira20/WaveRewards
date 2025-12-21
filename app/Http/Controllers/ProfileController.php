<?php

namespace App\Http\Controllers;

use App\Models\ActivityUser;
use App\Models\Badge;
use App\Models\Team;
use App\Services\ActivityService;
use App\Services\BadgeService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(
        protected BadgeService $badgeService,
        protected ActivityService $activityService
    ) {
    }

    
    public function index()
    {
        $user = Auth::user();

        $activities = $this->activityService->getUserActivities($user);

        $globalStats = $this->activityService->getUserGlobalStats($user);
        $stats = $this->activityService->getUserStats($globalStats);

        $upcomingAchievements = $this->badgeService->getUpcomingAchievements($user, $globalStats);
        $recentAchievements = $this->badgeService->getRecentAchievements($user);
        $medals = $this->badgeService->getMedals($user);
        $allEarnedBadges = $this->badgeService->getAllEarnedBadges($user);

        $teamData = null;
        $team = $user->teams()->where('teams.status', 'approved')->wherePivot('status', 'approved')->first();
        if ($team)
            $teamData = $this->formatTeamData($team);

        return Inertia::render("Authenticated/Profile", [
            'user' => [
                ...$user->toArray(),
                'created_at' => $user->created_at->translatedFormat('F Y'),
            ],
            'activities' => $activities,
            'stats' => $stats,
            'team' => $teamData,
            'medals' => $medals,
            'upcoming_achievements' => $upcomingAchievements,
            'recent_achievements' => $recentAchievements,
            'all_earned_badges' => $allEarnedBadges,
        ]);
    }


    private function formatTeamData($team)
    {
        $teamTotalPoints = $team->users()->sum('total_points');

        $ranking = Team::withSum('users', 'total_points')
            ->orderByDesc('users_sum_total_points')
            ->pluck('id')
            ->search($team->id) + 1;

        return [
            'name' => $team->name,
            'points' => $teamTotalPoints,
            'rank' => $ranking,
            'members' => $team->users->map(function ($member) {
                return [
                    'name' => $member->name,
                    'avatar' => $member->avatar,
                ];
            }),
        ];
    }
}
