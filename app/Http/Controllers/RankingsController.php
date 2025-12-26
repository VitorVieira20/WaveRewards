<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RankingsController extends Controller
{
    public function index()
    {
        $userRankings = User::query()
            ->select('id', 'name', 'avatar', 'total_points')
            ->withCount('activities as challenges_completed')
            ->withSum('activities as total_distance', 'activity_user.distance')
            ->withCount('badges as total_badges')
            ->orderByDesc('total_points')
            ->limit(50)
            ->get()
            ->map(function ($user, $index) {
                return [
                    'rank' => $index + 1,
                    'user' => [
                        'name' => $user->name,
                        'avatar' => $user->avatar ? asset($user->avatar) : null,
                    ],
                    'points' => $user->total_points,
                    'challenges' => $user->challenges_completed,
                    'distance' => round(($user->total_distance ?? 0) / 1000, 1),
                    'medals' => $user->total_badges
                ];
            });

        $teamRankings = Team::with('users:id,total_points')
            ->get()
            ->map(function ($team) {
                $memberIds = $team->users->pluck('id');

                $stats = DB::table('activity_user')
                    ->whereIn('user_id', $memberIds)
                    ->selectRaw('SUM(distance) as total_distance, COUNT(*) as total_challenges')
                    ->first();

                $totalTeamMedals = DB::table('badge_user')
                    ->whereIn('user_id', $memberIds)
                    ->count();

                $totalPoints = $team->users->sum('total_points');

                return [
                    'id' => $team->id,
                    'name' => $team->name,
                    'avatar' => "https://ui-avatars.com/api/?name=" . urlencode($team->name) . "&background=1A3463&color=fff&size=128",
                    'points' => $totalPoints,
                    'challenges' => $stats->total_challenges ?? 0,
                    'distance' => round(($stats->total_distance ?? 0) / 1000, 1),
                    'medals' => $totalTeamMedals
                ];
            })
            ->sortByDesc('points')
            ->values()
            ->map(function ($team, $index) {
                $team['rank'] = $index + 1;
                return $team;
            });

        return Inertia::render('Authenticated/Rankings', [
            'rankings' => $userRankings,
            'teams' => $teamRankings
        ]);
    }
}