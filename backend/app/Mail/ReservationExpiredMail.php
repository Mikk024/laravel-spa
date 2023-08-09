<?php

namespace App\Mail;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReservationExpiredMail extends Mailable
{
    use Queueable, SerializesModels;

    private $reservation;

    public function __construct(
        Reservation $reservation
    )
    {
        $this->reservation = $reservation;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reservation Expired',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome',
            with: [
                'reservation' => $this->reservation,
                'address' => $this->reservation->room->address,
                'username' => $this->reservation->user->name
            ]
        );
    }
}
