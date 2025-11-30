<?php

namespace App\Http\Controllers;

use App\Models\DailyGoal;
use App\Models\Team;
use App\Services\WeatherApiService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(protected WeatherApiService $weatherApiService)
    {
    }


    public function index()
    {
        $user = Auth::user();

        $locations = [
            'Funchal, PT',
            'Santana, PT',
            'Madalena do Mar, PT',
            'Santa Cruz, PT',
        ];

        $data = $this->weatherApiService->getHourlyAndWeekForecats($locations);

        $team = $user->teams()->first();

        $teamData = null;

        if ($team) {
            $teamTotalPoints = $team->users()->sum('total_points');
            $ranking = Team::withSum('users', 'total_points')
                ->orderByDesc('users_sum_total_points')
                ->pluck('id')
                ->search($team->id) + 1;

            $teamData = [
                'name' => $team->name,
                'points' => $teamTotalPoints,
                'rank' => $ranking,
            ];
        }

        $todayGoal = DailyGoal::firstOrCreate(
            ['user_id' => $user->id, 'date' => now()->format('Y-m-d')],
            ['target_distance' => 5000]
        );

        if (!isset($todayGoal->current_distance)) {
            $todayGoal->refresh();
        }

        return Inertia::render('Authenticated/Dashboard', [
            'weatherData' => $data,
            'team' => $teamData,
            'goal' => $todayGoal
        ]);
    }
}
