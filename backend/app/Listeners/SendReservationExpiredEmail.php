<?php

namespace App\Listeners;

use App\Events\ReservationExpired;
use App\Mail\ReservationExpiredMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendReservationExpiredEmail
{
    public function handle(ReservationExpired $event): void
    {
        $reservation = $event->reservation;

        Mail::to('rainbowman230@gmail.com')->send(new ReservationExpiredMail($reservation));
    }
}
