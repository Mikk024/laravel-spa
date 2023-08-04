<?php

use App\Http\Controllers\Api\V1\ProfileController;
use App\Http\Controllers\Api\V1\ReservationController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\RoomController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return UserResource::make($request->user());
});

//User profile
Route::get('users/{userId}', ProfileController::class);

Route::prefix('reviews')->group(function () {
    Route::post('', [ReviewController::class, 'store']);
    Route::get('{roomId}', [ReviewController::class, 'getReviewswByRoomId']);
});

Route::prefix('rooms')->group(function () {
    Route::get('', [RoomController::class, 'index']);
    Route::get('manage', [RoomController::class, 'manage']);
    Route::get('{roomId}', [RoomController::class, 'show']);
    Route::post('store', [RoomController::class, 'store']);
    Route::put('{roomId}', [RoomController::class, 'update']);
    Route::delete('{roomId}', [RoomController::class, 'destroy']);
});

Route::prefix('reservations')->group(function () {
    Route::post('store', [ReservationController::class, 'store']);
    Route::get('manage', [ReservationController::class, 'manage']);
    Route::get('{roomId}', [ReservationController::class, 'getDisabledDates']);
});

