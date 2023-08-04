<?php

namespace Tests\Feature\Api;

use App\Http\Resources\ReviewResource;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Room;
use App\Models\Review;
use Database\Factories\ReviewFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_api_successfully_stores_data(): void
    {
        $user = User::factory()->create();

        $reservation = Reservation::factory()->create([
            'user_id' => $user->id,
            'active' => false,
        ]);

        $this->assertDatabaseCount('reviews', 0);

        $response = $this
            ->actingAs($user)
            ->postJson('/api/v1/reviews', [
            'reservation_id' => $reservation->id,
            'comment' => "I've had a really good time",
            'rating' => 5
        ]);

        $this->assertDatabaseCount('reviews', 1);

        $response->assertStatus(201);
    }

    public function test_api_returns_reviews_based_on_room_id()
    {
        $room = Room::factory()->create();

        $reservation = Reservation::factory()->create([
            'room_id' => $room->id
        ]);

        $review = Review::factory()->create([
            'reservation_id' => $reservation->id,
        ]);

        $response = $this->getJson('/api/v1/reviews/' . $room->id);

        $response->assertStatus(200);

        $this->assertDatabaseCount('reviews', 1);

        $response->assertJson([
            'data' => [
                [
                    'id' => $reservation->id,
                    'rating' => $review->rating,
                    'comment' => $review->comment
                ]
            ]
        ]);

    }

}
