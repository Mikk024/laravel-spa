<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'file_path',
        'room_id'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
