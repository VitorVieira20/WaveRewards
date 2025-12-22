<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TeamMembersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teamName = 'Blue Ship';
        $totalMembers = 7;
        $totalPending = 2;

        $team = Team::firstOrCreate(['name' => $teamName, 'status' => 'approved']);

        $this->command->info("Populating Team: {$team->name}");

        User::factory($totalMembers)->create()->each(function ($user) use ($team) {

            $user->update(['total_points' => rand(100, 15000)]);

            $team->users()->attach($user->id, [
                'role' => 'member',
                'status' => 'approved',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });

        $this->command->info("{$totalMembers} approved members added.");

        User::factory($totalPending)->create()->each(function ($user) use ($team) {

            $user->update(['total_points' => rand(0, 500)]);

            $team->users()->attach($user->id, [
                'role' => 'member',
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });

        $this->command->info("{$totalPending} pending requests added.");

        $hasAdmin = $team->users()->wherePivot('role', 'admin')->exists();

        if (!$hasAdmin) {
            $teamSlug = Str::slug($teamName, '');

            // 2. Cria o email dinâmico
            $adminEmail = "admin.{$teamSlug}@rmail.com";

            $adminUser = User::factory()->create([
                'name' => 'Admin da Equipa',
                'email' => $adminEmail, // <--- Usa a variável aqui
                'password' => bcrypt('password'),
                'total_points' => 25000
            ]);

            $team->users()->attach($adminUser->id, [
                'role' => 'admin',
                'status' => 'approved',
            ]);

            $this->command->info("Admin created: {$adminEmail} / password");
        }
    }
}