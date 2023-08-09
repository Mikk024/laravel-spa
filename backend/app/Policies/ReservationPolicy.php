<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ReservationPolicy
{
    public function store(User $user): bool
    {
        if (auth()->check()) {
            return true;
        }

        return false;
    }
}
