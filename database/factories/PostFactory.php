<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'slug' => $this->faker->unique()->slug(),
            'featured_image' => $this->faker->imageUrl(),
            'content' => $this->faker->paragraphs(3, true),
            'user_id' => \App\Models\User::factory(),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'category' => $this->faker->randomElement(['news', 'blog', 'tutorial']),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
