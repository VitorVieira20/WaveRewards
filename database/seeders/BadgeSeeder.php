<?php

namespace Database\Seeders;

use App\Models\Badge;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('Creating Medals (Badges)...');

        $categories = [
            'workshops' => [
                'label' => 'Mestre de Workshops',
                'unit' => 'workshops',
                'values' => ['bronze' => 2, 'silver' => 5, 'gold' => 10]
            ],
            'distance' => [
                'label' => 'Lobo do Mar',
                'unit' => 'km',
                'values' => ['bronze' => 50, 'silver' => 250, 'gold' => 1000]
            ],
            'calories' => [
                'label' => 'Atleta de Elite',
                'unit' => 'kcal',
                'values' => ['bronze' => 5000, 'silver' => 20000, 'gold' => 50000]
            ],
            'trash' => [
                'label' => 'Guardião do Oceano',
                'unit' => 'kg',
                'values' => ['bronze' => 10, 'silver' => 50, 'gold' => 200]
            ],
            'time' => [
                'label' => 'Persistência Aquática',
                'unit' => 'min',
                'values' => ['bronze' => 300, 'silver' => 1200, 'gold' => 3000]
            ],
            'activities' => [
                'label' => 'Entusiasta de Atividades',
                'unit' => 'atividades',
                'values' => ['bronze' => 10, 'silver' => 40, 'gold' => 100]
            ],
        ];

        foreach ($categories as $key => $cat) {
            $this->command->warn("➜ Creating medals for: {$cat['label']}...");

            foreach ($cat['values'] as $tier => $value) {
                Badge::create([
                    'name' => "{$cat['label']} " . ucfirst($tier),
                    'description' => "Alcança um total de {$value} {$cat['unit']}.",
                    'image' => "images/medals/{$tier}.png",
                    'category' => $key,
                    'tier' => $tier,
                    'requirement_value' => $value,
                ]);

                $this->command->info("   ✅ Badge Created: {$tier} ({$value} {$cat['unit']})");
            }
        }

        $this->command->info('All medals were created successfully!');
    }
}