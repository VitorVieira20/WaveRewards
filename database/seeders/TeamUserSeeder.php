<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $team = Team::find(1);

        if (!$team) {
            $this->command->error('Team with ID 1 not found.');
            return;
        }

        $userIds = User::pluck('id');

        $team->users()->syncWithoutDetaching($userIds);

        $count = $userIds->count();
        $this->command->info("Success: {$count} users were added to '{$team->name}'.");
    }
}
