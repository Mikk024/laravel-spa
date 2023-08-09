<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ReviewPolicy
{
    public function store(User $user, Review $review): Response
    {
        return Review::where('user_id', $user->id)
            ->where('reservation_id', $review->reservation_id)
            ->doesntExist()
            ? Response::allow()
            : Response::deny('There is already review for this reservation!');
    }

}
