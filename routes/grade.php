<?php

use App\Http\Controllers\GradeController;
use Illuminate\Support\Facades\Route;

Route::resource('grade', GradeController::class);
Route::get('/grade/student/{student}', [GradeController::class, 'showStudent'])
    ->name('grade.showStudent');
