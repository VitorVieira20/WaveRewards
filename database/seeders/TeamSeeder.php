<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $teams = [
            ['name' => 'WaveForge Squad'],
            ['name' => 'NeonPulse Team'],
            ['name' => 'BlueShift Collective'],
            ['name' => 'PixelHarbor Crew'],
            ['name' => 'AquaCore Unit']
        ];

        foreach ($teams as $team) {
            $created = Team::firstOrCreate(
                ['name' => $team['name']],
                [
                    'name' => $team['name'],
                ]
            );

            if ($created->wasRecentlyCreated) {
                $this->command->info("Team created: {$created->name}");
            } else {
                $this->command->warn("Team already exists: {$created->name}");
            }
        }
    }
}
