<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'images' => [
                'activities/act_1.jpg',
                'activities/act_2.jpg'
            ],
            'description' => $this->faker->paragraph(),
            'level' => $this->faker->randomElement(['Básico', 'Intermédio', 'Avançado']),
            'category' => $this->faker->randomElement(['Iniciantes', 'Intermédias', 'Coordenação e Resistência', 'Competição e Recreação']),
            'location' => $this->faker->city(),
            'duration' => $this->faker->numberBetween(30, int2: 120),
            'material' => 'Caiaque, Remo, Colete',
            'benefits' => 'Melhora a resistência cardiovascular e força muscular.',
            'datetime' => $this->faker->dateTime()
        ];
    }
}
