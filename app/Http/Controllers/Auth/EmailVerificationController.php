<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailVerificationController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/verify-email');
    }

    public function verification(EmailVerificationRequest $request)
    {
        $request->fulfill();
        return redirect()->route('home');
    }

    public function send(Request $request)
    {
        $request->user()
            ->sendEmailVerificationNotification();

        return back()
            ->with('message', 'Verification link sent!');
    }
}
