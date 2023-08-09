<?php

namespace Tests\Feature\Api;

use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_successfully_stores_data()
    {
        $room = Room::factory()->create();

        $user = User::factory()->create();

        $startDate = Carbon::now();

        $this->assertDatabaseEmpty('reservations');

        $reservation = [
            'room_id' => $room->id,
            'start_date' => $startDate,
            'end_date' => $startDate->addDays(4),
            'price' => $room->price
        ];

        $response = $this
            ->actingAs($user)
            ->postJson('/api/v1/reservations/store', $reservation);

        $response->assertStatus(201);

        $this->assertDatabaseCount('reservations', 1);
    }

    public function test_api_returns_validation_errors()
    {
        $room = Room::factory()->create();

        $user = User::factory()->create();

        $startDate = Carbon::now();

        $reservation = [
            'room_id' => $room->id,
            'start_date' => '',
            'end_date' => $startDate->addDays(4),
            'price' => $room->price
        ];

        $response = $this
            ->actingAs($user)
            ->postJson('/api/v1/reservations/store', $reservation);

        $response->assertStatus(422);
    }

    public function test_api_successfully_returns_data_based_on_authenticated_user()
    {
        $user = User::factory()->create();

        $reservations = Reservation::factory(3)->create([
            'user_id' => $user->id
        ]);

        $response = $this
            ->actingAs($user)
            ->getJson('/api/v1/reservations/manage');
        
        $response->assertStatus(200);

        $this->assertJson($reservations);
    }

    public function test_api_returns_disabled_dates()
    {
        $room = Room::factory()->create();

        $reservation = Reservation::factory()->create([
            'start_date' => '2023-08-05',
            'end_date' => '2023-08-08',
            'room_id' => $room->id
        ]);

        $response = $this->getJson('/api/v1/reservations/' . $room->id);

        $response->assertStatus(200);

        $response->assertJson(
            ['2023-08-05',
            '2023-08-06',
            '2023-08-07',
            '2023-08-08']
        );
    }
}
