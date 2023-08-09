<?php

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    
    $user = User::find('99a93bf0-9752-43e0-94ef-62f41356b0c2');
    
    $imagePath = 'public/' . $user->profile_image;

    dd(Storage::url($imagePath));
    
    if (Storage::exists($imagePath)) {
        $image = Storage::get($imagePath);
    }

    $user = $request->user();

    $user['profile_image'] = $image;
    
    return $request->$user;
});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';
