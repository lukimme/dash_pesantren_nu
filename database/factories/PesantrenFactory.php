<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pesantren>
 */
class PesantrenFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => $this->faker->unique()->numberBetween(1, 100),
            'name' => fake()->company(),
            'slug' => fake()->company(),
            'pendiri' => fake()->name(),
            'pengasuh' => fake()->name(),
            'tanggal_berdiri' => fake()->dateTimeBetween('-30 years'),
            'deskripsi' => fake()->paragraph(),
            'gender' => fake()->randomElement(['putra', 'putri', 'putra_putri']),
            'program' => fake()->word(),
            'tingkat' => fake()->word(),
            'program_unggulan' => fake()->optional()->word(),
            'contact' => fake()->phoneNumber(),
            'logo' => 'logo.png', // Or use a fake image path if needed
            'video_profil' => 'video_profil.mp4', // Or use a fake video path if needed
            'foto_sampul' => 'foto_sampul.jpg', // Or use a fake image path if needed
            'foto' => 'foto.jpg', // Or use a fake image path if needed
        ];
    }
}
