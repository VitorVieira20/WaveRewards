<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Activity;

class ChartDataSeeder extends Seeder
{
    public function run(): void
    {
        $userId = 2;
        
        $user = User::find($userId);
        $activity = Activity::first() ?? Activity::factory()->create();

        if (!$user) {
            $this->command->error("Utilizador com ID {$userId} não encontrado!");
            return;
        }

        $this->command->info("A gerar dados de teste para o gráfico do utilizador: {$user->name}");

        DB::table('activity_user')->where('user_id', $userId)->delete();

        $dataPoints = [
            ['date' => Carbon::now(), 'pts' => 500, 'dist' => 5000],
            ['date' => Carbon::now()->subDays(1), 'pts' => 300, 'dist' => 2000],
            ['date' => Carbon::now()->subDays(3), 'pts' => 800, 'dist' => 7500],
            ['date' => Carbon::now()->subDays(6), 'pts' => 150, 'dist' => 1000],

            ['date' => Carbon::now()->subDays(10), 'pts' => 1200, 'dist' => 10000],
            ['date' => Carbon::now()->subDays(18), 'pts' => 600, 'dist' => 4000],
            ['date' => Carbon::now()->subDays(25), 'pts' => 900, 'dist' => 8000],

            ['date' => Carbon::now()->subMonths(2), 'pts' => 3000, 'dist' => 25000],
            ['date' => Carbon::now()->subMonths(4), 'pts' => 4500, 'dist' => 40000],
            ['date' => Carbon::now()->subMonths(6), 'pts' => 2000, 'dist' => 15000],
        ];

        foreach ($dataPoints as $point) {
            DB::table('activity_user')->insert([
                'user_id' => $userId,
                'activity_id' => $activity->id,
                'distance' => $point['dist'], // em metros
                'practice_time' => rand(30, 120),
                'wasted_calories' => rand(200, 800),
                'points' => $point['pts'],
                'trash_collected' => rand(500, 5000),
                'created_at' => $point['date'],
                'updated_at' => $point['date'],
            ]);
        }

        $this->command->info("Sucesso! Foram criadas " . count($dataPoints) . " atividades distribuídas no tempo.");
    }
}