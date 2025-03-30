<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kit>
 */
class KitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->unique()->slug(),
            'name' => fake()->name(),
            'vendor' => fake()->name(),
            'description' => fake()->text(),
            'source_url' => fake()->url(),
            'source_type' => fake()->word(),
            'stars' => fake()->numberBetween(0, 1000),
            'downloads' => fake()->numberBetween(0, 1000),
            'maintainers' => [],
            'authors' => [],
            'licenses' => [],
        ];
    }
}
