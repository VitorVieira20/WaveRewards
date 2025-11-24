<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RankingsController extends Controller
{
    public function index()
    {
        /* $currentUser = Auth::user();

        $rawActivities = $currentUser->activities()
            ->orderByPivot('created_at', 'desc')
            ->get();

        $myStats = [
            'total_distance' => round($rawActivities->sum('pivot.distance') / 1000, 1),
            'total_calories' => $rawActivities->sum('pivot.wasted_calories'),
            'total_points' => $rawActivities->sum('pivot.points'),
            'total_activities' => $rawActivities->count(),
            'total_hours' => round($rawActivities->sum('pivot.practice_time') / 60, 1),
        ]; */

        $rankings = User::query()
            ->select('id', 'name', 'avatar', 'total_points')
            ->withCount('activities as challenges_completed')
            ->withSum('activities as total_distance', 'activity_user.distance')
            ->orderByDesc('total_points')
            ->orderByDesc('total_distance')
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
                    'distance' => round(($user->total_distance ?? 0) / 1000, 1) . ' km',
                    'medals' => random_int(1, 12)
                ];
            });

        return Inertia::render('Authenticated/Rankings', [
            /* 'myStats' => $myStats, */
            'rankings' => $rankings
        ]);
    }
}