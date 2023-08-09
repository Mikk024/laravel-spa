<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_number' => ['required', 'digits_between:6, 11']
        ]);

        if ($request->hasFile('profile_image')) {
            $filePath = $request->file('profile_image')->store('users/image/' . Carbon::now() . Str::random(10), 'public');
            $validated['profile_image'] = $filePath;
        }

        Hash::make($validated['password']);

        $user = User::create($validated);

        event(new Registered($user));

        return response()->json([
            'message' => 'User successfully created'
        ]);
    }
}
