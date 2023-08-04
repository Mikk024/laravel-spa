<?php

namespace Database\Factories;

use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{

    protected $model = Review::class;

    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(),
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->sentences(4, true),
            'user_id' => User::factory()
        ];
    }
}
