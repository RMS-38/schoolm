<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserCreateRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/register');
    }

    public function store(UserCreateRequest $request)
    {
        $user = User::create($request->validated());
        event(new Registered($user));
        Auth::login($user);
        return redirect()->route('dashboard');
    }
}
