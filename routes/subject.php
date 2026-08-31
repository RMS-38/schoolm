<?php

use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/subject', [SubjectController::class, 'index'])
        ->name('subject.index');

    Route::post('/subject', [SubjectController::class, 'store'])
        ->name('subject.store');

    Route::put('/subject/{subject}', [SubjectController::class, 'update'])
        ->name('subject.update');

    Route::delete('/subject/{subject}', [SubjectController::class, 'destroy'])
        ->name('subject.destroy');
});
