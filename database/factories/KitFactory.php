<?php

declare(strict_types=1);

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
            'source_type' => 'git',
            'stars' => fake()->numberBetween(0, 1000),
            'downloads' => fake()->numberBetween(0, 1000),
            'maintainers' => array_map(fn () => [
                'name' => fake()->name(),
                'avatar_url' => fake()->imageUrl(),
            ], range(1, 3)),
            'authors' => array_map(fn () => [
                'name' => fake()->name(),
                'email' => fake()->email(),
            ], range(1, 3)),
            'licenses' => ['MIT'],
        ];
    }
}
