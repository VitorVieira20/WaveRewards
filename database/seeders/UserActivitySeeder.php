<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\ActivityUser;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserActivitySeeder extends Seeder
{
    public function run(): void
    {
        $users = User::whereIn('id', [2, 3])->get();
        $activities = Activity::all();

        if ($activities->isEmpty()) return;

        ActivityUser::withoutEvents(function () use ($users, $activities) {

            foreach ($users as $user) {
                $randomActivities = $activities->random(rand(3, 5));

                $userTotalPoints = 0;

                foreach ($randomActivities as $activity) {
                    $practiceTime = rand(20, 120);
                    $distance = $practiceTime * rand(60, 100);
                    $calories = $practiceTime * rand(5, 10);
                    $effort = rand(3, 9);

                    $tempData = (object) [
                        'practice_time' => $practiceTime,
                        'distance' => $distance,
                        'wasted_calories' => $calories,
                        'effort' => $effort
                    ];

                    $points = ActivityUser::calculatePoints($tempData);

                    $userTotalPoints += $points;

                    ActivityUser::create([
                        'user_id' => $user->id,
                        'activity_id' => $activity->id,
                        'distance' => $distance,
                        'practice_time' => $practiceTime,
                        'wasted_calories' => $calories,
                        'frequency' => rand(110, 175),
                        'effort' => $effort,
                        'observations' => fake()->randomElement(['Treino bom.', 'Cansativo.', null]),
                        'points' => $points,
                        'created_at' => fake()->dateTimeBetween('-2 months', 'now'),
                    ]);
                }

                $user->increment('total_points', $userTotalPoints);
            }
        });

        $this->command->info('User activities were generated and user points were updated!');
    }
}