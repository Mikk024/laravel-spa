<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_users_can_register(): void
    {
        $user = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'phone_number' => '533123322',
            'password_confirmation' => 'password',
        ];

        $response = $this->post('/register', $user);

        $this->assertGuest();
        $this->assertDatabaseHas('users', [
            'name' => $user['name'],
            'email' => $user['email'],
            'phone_number' => $user['phone_number']
        ]);
        $response->assertStatus(200);
    }
}
