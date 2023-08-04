<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReservationFactory extends Factory
{
    public function definition(): array
    {
        $startDate = fake()->dateTimeThisMonth('now', 'UTC');
        $price = fake()->numberBetween(100, 400);

        return [
            'user_id' => User::factory(),
            'room_id' => Room::factory(),
            'start_date' => $startDate,
            'end_date' => Carbon::parse($startDate)->addDays(fake()->numberBetween(4, 10)),
            'price' => $price,
            'total' => $price * fake()->numberBetween(2, 6),
            'active' => fake()->boolean()
        ];
    }
}
