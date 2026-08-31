<?php

namespace App\Models;

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

    public function reportCards(int $term = 1, int $perPage = 10)
    {
        $students = $this->students()
            ->with(['marks' => fn($q) => $q->where('term', $term)->with('subject')])
            ->paginate($perPage);


        $reports = $students->getCollection()->map(function ($student) use ($term) {
            $report = $student->reportCard($term);
            return [
                'id' => $student->id,
                'name' => $student->name,
                'marks' => $report['marks'],
                'total' => $report['total'],
                'average' => $report['average'],
                'rank' => null
            ];
        });
        //calculate rank
        $allReports = $this->students()
            ->with(['marks' => fn($q) => $q->where('term', $term)])
            ->get()
            ->map(fn($student) => [
                'id' => $student->id,
                'average' => $student->reportCard($term)['average']
            ])->filter(fn($r) => $r['average'] !== null)
            ->sortByDesc('average')
            ->values();

        $rank = 1;
        $lastAverage = null;
        $ranks = [];

        foreach ($allReports as $index => $r) {
            if ($lastAverage !== null && $r['average'] < $lastAverage) {
                $rank = $index + 1;
            }
            $ranks[$r['id']] = $rank;
            $lastAverage = $r['average'];
        }

        $reports = $reports->map(function ($r) use ($ranks) {
            if (isset($ranks[$r['id']])) {
                $r['rank'] = $ranks[$r['id']];
            }

            return $r;
        });

        $reports = $reports->sortBy('rank')->values();

        $students->setCollection($reports);

        return $students;
    }

    public function yearReportCards(int $perPage = 10)
    {
        $students = $this->students()->paginate($perPage);

        $reports = $students->getCollection()->map(function ($student) {
            $year = $student->yearReportCard();
            return [
                'id'             => $student->id,
                'name'           => $student->name,
                'year_average' => $year['year_average'],
                'terms'          => $year['terms'],
                'rank'           => null,
            ];
        });


        $sorted = $reports->sortByDesc(fn($r) => $r['year_average'] ?? -1)
            ->values();

        $rank = 1;
        $lastAverage = null;
        $ranks = [];

        foreach ($sorted as $index => $r) {
            if ($lastAverage !== null && $r['year_average'] < $lastAverage) {
                $rank = $index + 1;
            }
            $ranks[$r['id']] = $rank;
            $lastAverage = $r['year_average'];
        }

        $sorted = $sorted->map(function ($r) use ($ranks) {
            if (isset($ranks[$r['id']])) {
                $r['rank'] = $ranks[$r['id']];
            }
            return $r;
        });

        $students->setCollection($sorted);

        return $students;
    }
}
