<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Image;
use App\Models\Room;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::query()
            ->with('images')
            ->when(request()->filled('address'), function ($q) {
                $q->where('address', 'like', '%' . request()->input('address') . '%');
            })
            ->paginate(8);

        return RoomResource::collection($rooms);
    }

    public function show($roomId)
    {
        $room = Room::with(['reservations', 'images'])->findOrFail($roomId);

        return new RoomResource($room);
    }

    public function store(RoomRequest $request)
    {
        $this->authorize('store', Room::class);

        $validated = $request->validated();

        $validated['owner_id'] = auth()->id();

        $room = Room::create($validated);

        $imageDestination = auth()->id() . Carbon::now();

        foreach ($request->file('images') as $image) {
            $imagePath = $image->store('rents/images/' . $imageDestination, 'gcs');
            $imageUrl = Storage::disk('gcs')->url($imagePath);
            Image::create([
                'file_path' => $imageUrl,
                'room_id' => $room->id
            ]);
        }

        return RoomResource::make($room);
    }

    public function update($roomId, RoomRequest $request)
    {
        $validated = $request->validated();

        $room = Room::findOrfail($roomId);
        
        $this->authorize('update', $room);

        $room->update($validated);

        return response()->json(['message' => 'Record is successfully updated'], 200);
    }

    public function destroy($roomId)
    {
        $room = Room::findOrfail($roomId);

        $this->authorize('delete', $room);

        foreach ($room->images as $image) {
            Storage::disk('gcs')->delete('public/' . $image->file_path);
        };

        $room->delete();

        return response()->json([
            'message' => 'Record successfully destroyed'
        ]);
    }

    public function manage()
    {
        $this->authorize('store', Room::class);

        $userId = auth()->id();

        $rooms = Room::with('images')->where('owner_id', $userId)->paginate(8);

        return RoomResource::collection($rooms);
    }
}
