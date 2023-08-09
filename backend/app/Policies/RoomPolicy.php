<?php

namespace App\Policies;

use App\Models\Room;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RoomPolicy
{
    public function store(User $user): bool
    {
        if (auth()->check()) {
            return true;
        }
        return false;
    }

    public function update(User $user, Room $room): bool
    {
        return $user->id === $room->owner_id;
    }

    public function delete(User $user, Room $room): Response
    {
        return $room->reservations()->where('active', true)->doesntExist()
            ? Response::allow()
            : Response::deny('There are still active reservations for this room');
    }
}
