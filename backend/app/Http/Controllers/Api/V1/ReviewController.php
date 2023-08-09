<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;

class ReviewController extends Controller
{
    public function store(ReviewRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
    
        $review = new Review($validated);
        
        $this->authorize('store', $review);
       
    
        $review->save();

        return new ReviewResource($review);
    }

    public function getReviewswByRoomId($roomId)
    {
        $reviews = Review::join('reservations', 'reviews.reservation_id', '=', 'reservations.id')
            ->with(['user'])
            ->where('room_id', $roomId)
            ->limit(5)
            ->get();

        return ReviewResource::collection($reviews);
        
    }  
}
