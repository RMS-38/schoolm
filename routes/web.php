<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MarkController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');
Route::resource('student', StudentController::class);

require __DIR__ . '/grade.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/subject.php';
require __DIR__ . '/mark.php';
