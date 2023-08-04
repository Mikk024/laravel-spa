<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    public function definition(): array
    {
        return [
            'total_occupancy' => fake()->numberBetween(4, 12),
            'total_bedrooms' => fake()->numberBetween(4, 12),
            'total_bathrooms' => fake()->numberBetween(4, 12),
            'address' => fake()->address(),
            'has_tv' => fake()->boolean(),
            'has_kitchen' => fake()->boolean(),
            'has_air_con' => fake()->boolean(),
            'has_heating' => fake()->boolean(),
            'has_internet' => fake()->boolean(),
            'price' => fake()->numberBetween(100, 200),
            'owner_id' => User::factory()
        ];
    }
}
