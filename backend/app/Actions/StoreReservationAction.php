<?php

namespace App\Actions;

use App\Http\Requests\ReservationRequest;
use App\Models\Reservation;
use Carbon\Carbon;

class StoreReservationAction {

    public function handle(ReservationRequest $request): Reservation
    {
        $validated = $request->validated();

        $validated['user_id'] = auth()->id();

        $startDate = Carbon::parse($request->start_date)->addDay()->format('Y-m-d');

        $endingDate = Carbon::parse($request->end_date)->addDay()->format('Y-m-d');

        $result = Carbon::parse($startDate)->diffInDays($endingDate) + 1;

        $validated['total'] = $request->price * $result;

        $validated['start_date'] = $startDate;

        $validated['end_date'] = $endingDate;

        return Reservation::create($validated);
    }
}