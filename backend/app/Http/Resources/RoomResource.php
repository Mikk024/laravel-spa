<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class RoomResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'total_occupancy' => $this->total_occupancy,
            'total_bedrooms' => $this->total_bedrooms,
            'total_bathrooms' => $this->total_bathrooms,
            'address' => $this->address,
            'has_tv' => $this->has_tv,
            'has_kitchen' => $this->has_kitchen,
            'has_air_con' => $this->has_air_con,
            'has_heating' => $this->has_heating,
            'has_internet' => $this->has_internet,
            'price' => $this->price,
            'owner_id' => $this->owner_id,
            'reservations' => ReservationResource::collection($this->whenLoaded('reservations')),
            'images' => ImageResource::collection($this->whenLoaded('images'))
        ];
    }
}
