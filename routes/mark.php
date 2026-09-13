<?php

use App\Http\Controllers\MarkController;
use Illuminate\Support\Facades\Route;

Route::get('mark/pdf/{grade}/year', [MarkController::class, 'reportYearPdf'])
    ->name('year.pdf');

Route::get('mark/pdf/{student}/{term}', [MarkController::class, 'cardPdf'])
    ->name('mark.pdf');

Route::get('mark/cardsPdf/{grade}/{term}', [MarkController::class, 'cardsPdf'])
    ->name('marks.pdf');

Route::post('mark/{student}', [MarkController::class, 'store'])
    ->name('mark.store');
Route::get('mark/{student}/{term}', [MarkController::class, 'show'])
    ->name('mark.show');
Route::put('mark/{student}', [MarkController::class, 'update'])
    ->name('mark.update');
