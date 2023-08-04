<?php

namespace App\Http\Controllers\Api\V1;

use App\Actions\StoreReservationAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\Review;
use Carbon\Carbon;
use App\Models\User;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(ReservationRequest $request, StoreReservationAction $action)
    {
        $this->authorize('store', Reservation::class);

        $reservation = $action->handle($request);

        return ReservationResource::make($reservation);
    }

    public function manage()
    {
        $this->authorize('store', Reservation::class);

        $userId = auth()->id();

        $reservations = Reservation::with(['room'])
            ->where('user_id', $userId)
            ->orderBy('active', 'desc')
            ->paginate(4);
        
        return ReservationResource::collection($reservations);
    }

    public function getDisabledDates($roomId)
    {
        $dates = Reservation::where('room_id', $roomId)
            ->where('active', true)
            ->get(['start_date', 'end_date']);
            

        $disabledDates = [];

        foreach ($dates as $date) {
            $startDate = new DateTime($date->start_date);
            $endDate = new DateTime($date->end_date);
            $endDate->modify('+1 day');
        
            $dateInterval = new DateInterval('P1D');
            $dateRange = new DatePeriod($startDate, $dateInterval, $endDate);
        
            foreach ($dateRange as $date) {
                $disabledDates[] = $date->format('Y-m-d');
            }
        }
        

        return response()->json($disabledDates);

    }
}
