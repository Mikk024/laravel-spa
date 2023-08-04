<?php

namespace Tests\Feature\Api;

use App\Models\Room;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Tests\TestCase;

class RoomTest extends TestCase
{
    
    use RefreshDatabase;

    public function test_api_returns_rooms_data(): void
    {
        $room = Room::factory()->create();

        $response = $this->getJson('/api/v1/rooms');

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                [
                    'id' => $room->id
                ]
            ]
        ]);
    }

    public function test_api_successfully_stores_data()
    {
        $user = User::factory()->create();

        $images= [];

        for ($i = 0; $i < 6; $i++) {
            $image = UploadedFile::fake()->image("example{$i}.jpg", 1000, 1000);
            $images[$i] = $image;
        }
        
        $room = [
            'total_occupancy' => 6,
            'total_bedrooms' => 4,
            'total_bathrooms' => 2,
            'address' => '1030, Boston MA',
            'has_tv' => true,
            'has_kitchen' => false,
            'has_air_con' => false,
            'has_heating' => true,
            'has_internet' => false,
            'price' => 300,
            'images' => $images
        ];

        $response = $this
            ->actingAs($user)
            ->postJson('/api/v1/rooms/store', $room);

        $response->assertStatus(201);

        $this->assertDatabaseHas('rooms', [
            'owner_id' => $user->id
        ]);
    }

    public function test_api_returns_validation_errors()
    {
        $room = [
            'total_occupancy' => 6,
            'total_bedrooms' => 4,
            'total_bathrooms' => 2,
            'address' => '1030, Boston MA',
            'has_tv' => true,
            'has_kitchen' => false,
            'has_air_con' => false,
        ];

        $response = $this->postJson('api/v1/rooms/store', $room);

        $response->assertStatus(422);
    }

    public function test_api_returns_single_record()
    {
        $user = User::factory()->create();

        $room = Room::factory([
            'owner_id' => $user->id
        ])->create();

        $response = $this->getJson('/api/v1/rooms/' . $room->id);

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $room->id
            ]
        ]);
    }

    public function test_api_successfully_deletes_record()
    {
        $user = User::factory()->create();

        $room = Room::factory()->create([
            'owner_id' => $user->id
        ]);

        $this->assertDatabaseCount('rooms', 1);

        $response = $this
            ->actingAs($user)
            ->deleteJson('/api/v1/rooms/' . $room->id);
        
        $response->assertStatus(200);

        $this->assertDatabaseCount('rooms', 0);
    }

    public function test_api_successfully_updates_record()
    {
        $user = User::factory()->create();

        $room = Room::factory()->create([
            'owner_id' => $user->id,
            'price' => 100
        ]);

        $this->assertDatabaseHas('rooms', [
            'owner_id' => $user->id,
            'price' => 100,
            'id' => $room->id
        ]);

        $roomData = [
            'price' => 300,
            'total_occupancy' => 8,
            'total_bedrooms' => 4,
            'total_bathrooms' => 4,
            'address' => '1030, Boston MA',
            'has_tv' => true,
            'has_kitchen' => false,
            'has_air_con' => true,
            'has_internet' => true,
            'has_heating' => true
        ];


        $response = $this
            ->actingAs($user)
            ->putJson('/api/v1/rooms/' . $room->id, $roomData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('rooms', [
            'owner_id' => $user->id,
            'price' => 300,
            'id' => $room->id
        ]);
    }

    public function test_api_successfully_returns_data_based_on_authenticated_user()
    {
        $user = User::factory()->create();


        $rooms = Room::factory(3)->create([
            'owner_id' => $user->id
        ]);

        $response = $this
            ->actingAs($user)
            ->getJson('/api/v1/rooms/manage');

        $response->assertStatus(200);

        $this->assertJson($rooms);
    }
}
