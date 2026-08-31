<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function create()
    {
        return Inertia::render('settings/profile');
    }

    public function name(Request $request, User $user)
    {
        $field = $request->validate(['name' => ['required', 'string', 'max:255']]);
        $user->name = $field['name'];
        $user->save();

        return Inertia::flash('status', 'Name updated successfully')->back();
    }

    public function email(Request $request, User $user)
    {
        $field = $request->validate([
            'email' => [
                'required',
                'string',
                'max:255',
                'email',
                Rule::unique('users', 'email')->ignore($user->id)
            ]
        ]);

        $user->email = $field['email'];
        $user->email_verified_at = null;

        $user->save();
        return Inertia::flash('status', 'Email updated successfully')->back();
    }

    public function password(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'min:3']
        ]);
        $request->user()->update([
            'password' => Hash::make($request->password)
        ]);

        return Inertia::flash('status', 'Password updated successfully')->back();
    }

    public function theme(Request $request)
    {
        $request->validate(['theme' => 'in:light,dark,system']);
        $user = $request->user();
        $user->theme = $request->theme;
        $user->save();
        return back();
    }

    public function avatar(Request $request)
    {
        $request->validate([
            'avatar' => ['file', 'max:3704', 'mimes:png,jpg,jpeg,webp']
        ]);
        $msg = "Avatar created successfully";
        if ($request->hasFile("avatar")) {
            $user = $request->user();
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
                $msg = "Avatar updated successfully";
            }
            $user->avatar = $request->file('avatar')->store('images/avatars', 'public');
            $user->save();
        }

        return Inertia::flash('status', $msg)->back();
    }
}
