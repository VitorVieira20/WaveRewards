<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            WorkshopSeeder::class,
            TutorialSeeder::class,
            InformationSeeder::class,
            ActivitySeeder::class,
            UserActivitySeeder::class,
            TeamSeeder::class,
            TeamUserSeeder::class,
            SettingsSeeder::class,
            TagSeeder::class,
        ]);
    }
}
