<?php

use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/settings', [ProfileController::class, 'create'])
        ->name('setting.profile');

    //--------name---------
    Route::patch('settings/{user}/name', [ProfileController::class, 'name'])
        ->name('setting.name');

    Route::patch('settings/{user}/email', [ProfileController::class, 'email'])
        ->name('setting.email');

    Route::patch('settings/password', [ProfileController::class, 'password'])
        ->name('setting.password');

    Route::patch('settings/theme', [ProfileController::class, 'theme'])
        ->name('setting.theme');

    Route::patch('settings/avatar', [ProfileController::class, 'avatar'])
        ->name('setting.avatar');
});
