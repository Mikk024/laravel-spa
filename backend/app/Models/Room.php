<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Room extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'id',
        'total_occupancy',
        'total_bedrooms',
        'total_bathrooms',
        'address',
        'has_tv',
        'has_kitchen',
        'has_air_con',
        'has_heating',
        'has_internet',
        'price',
        'owner_id'
    ];

    public function setHasTvAttribute($value)
    {
        $this->attributes['has_tv'] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setHasKitchenAttribute($value)
    {
        $this->attributes['has_kitchen'] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setHasInternetAttribute($value)
    {
        $this->attributes['has_internet'] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setHasHeatingAttribute($value)
    {
        $this->attributes['has_heating'] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function setHasAirConAttribute($value)
    {
        $this->attributes['has_air_con'] = filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
