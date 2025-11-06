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
            ['name' => 'David França', 'email' => 'david@email.com', 'address' => 'Funchal', 'username' => 'david_franca', 'avatar' => 'images/team/david2.png'],
            ['name' => 'Leonor Freitas', 'email' => 'leonor@email.com', 'address' => 'Funchal', 'username' => 'leonor_freitas', 'avatar' => 'images/team/david2.png'],
            ['name' => 'Roberto Andrade', 'email' => 'roberto@email.com', 'address' => 'Funchal', 'username' => 'roberto_andrade', 'avatar' => 'images/team/roberto.png'],
            ['name' => 'Vitor Vieira', 'email' => 'vitor@email.com', 'address' => 'Funchal', 'username' => 'vitor_vieira', 'avatar' => 'images/team/vitor2.png']
        ];

        foreach ($users as $user) {
            $created = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'address' => $user['address'],
                'username' => $user['username'],
                'avatar' => $user['avatar'],
            ]);

            if (!$created) {
                $this->command->warn('Failed to create User.');
                return;
            }

            $this->command->info("User created: Name {$created->name} with email: {$created->email}");
        }
    }
}
