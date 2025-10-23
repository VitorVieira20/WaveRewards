<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['name' => 'David França', 'email' => 'david@email.com'],
            ['name' => 'Leonor Freitas', 'email' => 'leonor@email.com'],
            ['name' => 'Roberto Andrade', 'email' => 'roberto@email.com'],
            ['name' => 'Vitor Vieira', 'email' => 'vitor@email.com']
        ];

        foreach ($users as $user) {
            $created = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'email_verified_at' => now()
            ]);

            if (!$created) {
                $this->command->warn('Failed to create User.');
                return;
            }

            $this->command->info("User created: Name {$created->name} with email: {$created->email}");
        }
    }
}
