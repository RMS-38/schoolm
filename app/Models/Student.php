<?php

namespace App\Models;

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
        return collect([1, 2, 3, 4])->map(function ($term) {
            $reports = $term === 4
                ? $this->grade->yearReportCards()->getCollection()
                : $this->grade->reportCards($term)->getCollection();
            $report = $reports->firstWhere('id', $this->id);
            return $report['rank'];
        });
    }

    public function reportCard(int $term = 1)
    {
        $marks = $this->marks()->where('term', $term)->with('subject')->get();

        if ($marks->isEmpty()) {
            return [
                'marks' => [],
                'total' => null,
                'average' => null
            ];
        }

        $totalMark = $marks->sum('value');
        $weightSum = $marks->sum('weight');
        $average = $weightSum > 0 ? round($totalMark / $weightSum, 2) : null;
        return [
            'marks' => $marks->map(fn($m) => [
                'subject_id' => $m->subject->id,
                'subject' => $m->subject->name,
                'weight' => $m->weight,
                'value' => $m->value
            ]),
            'total' => $totalMark,
            'average' => $average
        ];
    }

    public function yearReportCard()
    {
        $averages = collect([1, 2, 3])->map(fn($term) => $this->reportCard($term)['average'])
            ->filter(fn($avg) => $avg !== null);

        if ($averages->isEmpty()) {
            return [
                'year_average' => null,
                'terms' => []
            ];
        }

        return [
            'year_average' => round($averages->sum() / $averages->count(), 2),
            'terms' => $averages
        ];
    }
}
