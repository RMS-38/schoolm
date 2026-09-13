<?php

namespace App\Models;

use App\Services\ReportService;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['grade_id', 'name', 'gender', 'dob', 'pob', 'address', 'email', 'phone', 'photo'])]
class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }

    public function marks(): HasMany
    {
        return $this->hasMany(Mark::class);
    }

    public function ranks()
    {
        return app(ReportService::class)->ranks($this);
    }

    public function reportCard(int $term = 1)
    {
        return app(ReportService::class)->reportCard($this, $term);
    }

    public function yearReportCard()
    {
        return app(ReportService::class)->yearReportCard($this);
    }
}
