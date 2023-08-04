<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Reservation;
use Carbon\Carbon;
use App\Events\ReservationExpired;
use Illuminate\Support\Facades\Mail;

class UpdateReservationStatus extends Command
{
    protected $signature = 'reservations:update-status';
    protected $description = 'Set all expired reservations false';

    public function handle()
    {
        $reservations = Reservation::where('end_date', '<', Carbon::now())
            ->where('active', true)
            ->get();

        foreach ($reservations as $reservation) {
            event(new ReservationExpired($reservation));
            $reservation->active = false;
            $reservation->save();
        }

        $this->info('Reservations status updated');
    }
}
