<?php

namespace App\Http\Resources;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
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
            'price' => $this->price,
            'total' => $this->total,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'active' => $this->active,
            'room' => new RoomResource($this->whenLoaded('room')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
        ];
    }
}
