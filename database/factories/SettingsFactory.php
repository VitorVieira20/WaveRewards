<?php

namespace Database\Factories;

use App\Models\Settings;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Settings>
 */
class SettingsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Settings::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),

            'email_notifications' => $this->faker->boolean(80),
            'push_notifications' => $this->faker->boolean(70),
            'weekly_digest' => $this->faker->boolean(50),
            'challenge_alerts' => $this->faker->boolean(60),
            'team_notifications' => $this->faker->boolean(90),

            'public_profile' => $this->faker->boolean(50),
            'share_activities' => $this->faker->boolean(40),
            'share_location' => $this->faker->boolean(20),

            'language' => $this->faker->randomElement(['pt', 'en', 'es', 'fr']),
            'distance_unit' => $this->faker->randomElement(['km', 'mi']),
            'temperature_unit' => $this->faker->randomElement(['c', 'f']),
            'timezone' => $this->faker->timezone(),
        ];
    }
}