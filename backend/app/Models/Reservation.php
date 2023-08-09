<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'room_id',
        'start_date',
        'end_date',
        'price',
        'user_id',
        'total'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function setEndDateAttribute($value)
    {
        $carbonDate = Carbon::parse($value);

        $formattedDate = $carbonDate->format('Y-m-d H:i:s');

        $this->attributes['end_date'] =  $formattedDate;
    }

    public function setStartDateAttribute($value)
    {
        $carbonDate = Carbon::parse($value);

        $formattedDate = $carbonDate->format('Y-m-d H:i:s');

        $this->attributes['start_date'] =  $formattedDate;
    }
}
