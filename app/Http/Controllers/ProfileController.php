<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $rawActivities = $user->activities()
            ->orderByPivot('created_at', 'desc')
            ->get();

        $stats = [
            'total_distance' => round($rawActivities->sum('pivot.distance') / 1000, 1),
            'total_calories' => $rawActivities->sum('pivot.wasted_calories'),
            'total_points' => $rawActivities->sum('pivot.points'),
            'total_activities' => $rawActivities->count(),
            'total_hours' => round($rawActivities->sum('pivot.practice_time') / 60, 1),
        ];

        $formattedActivities = $rawActivities
            ->take(2)
            ->map(function ($activity) {
                return [
                    'id' => $activity->id,
                    'date' => $activity->pivot->created_at->translatedFormat('d M Y - H:i'),
                    'title' => $activity->title,
                    'distance' => round($activity->pivot->distance / 1000, 1) . ' km',
                    'duration' => $activity->pivot->practice_time . ' min',
                    'points' => $activity->pivot->points,
                    'calories' => $activity->pivot->wasted_calories . ' kcal',
                ];
            });

        $teamData = null;

        $team = $user->teams()->first();

        if ($team) {
            $teamData = $this->formatTeamData($team);
        }

        return Inertia::render("Authenticated/Profile", [
            'user' => [
                ...$user->toArray(),
                'created_at' => $user->created_at->translatedFormat('F Y'),
            ],
            'activities' => $formattedActivities,
            'stats' => $stats,
            'team' => $teamData
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
