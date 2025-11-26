<?php

namespace Database\Seeders;

use App\Models\Settings;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usersWithoutSettings = User::doesntHave('settings')->get();

        if ($usersWithoutSettings->isEmpty()) {
            $this->command->warn("All users have settings configured.");
            return;
        }

        foreach ($usersWithoutSettings as $user) {
            Settings::factory()->create([
                'user_id' => $user->id,
            ]);

            $this->command->info("Settings created for user: {$user->name} ({$user->email})");
        }
    }
}