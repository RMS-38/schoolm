<?php

namespace App\Models;

use App\Services\ReportService;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name'])]
class Grade extends Model
{
    /** @use HasFactory<\Database\Factories\GradeFactory> */
    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class);
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    public function marks(): HasMany
    {
        return $this->hasMany(Mark::class);
    }

    public function reportCards(int $term = 1)
    {
        return app(ReportService::class)->reportCards($this, $term);
    }

    public function yearReportCards()
    {
        return app(ReportService::class)->yearReportCards($this);
    }
}
