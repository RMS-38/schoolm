<?php

namespace App\Services;

use App\Models\Grade;
use App\Models\Student;

class ReportService
{
    public function ranks(Student $student)
    {
        return collect([1, 2, 3, 4])->map(function ($term) use ($student) {
            $reports = $term === 4
                ? $student->grade->yearReportCards()
                : $student->grade->reportCards($term);
            $report = $reports->firstWhere('id', $student->id);
            return $report['rank'];
        });
    }

    public function reportCard(Student $student, int $term = 1)
    {
        $marks = $student->marks()->where('term', $term)->with('subject')->get();

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

    public function yearReportCard(Student $student)
    {
        $averages = collect([1, 2, 3])->map(fn($term) => $student->reportCard($term)['average'])
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

    public function reportCards(Grade $grade, int $term = 1)
    {
        $students = $grade->students()
            ->with(['marks' => fn($q) => $q->where('term', $term)->with('subject')])
            ->get();


        $reports = $students->map(function ($student) use ($term) {
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
        $allReports = $grade->students()
            ->with(['marks' => fn($q) => $q->where('term', $term)])
            ->get()
            ->map(fn($student) => [
                'id' => $student->id,
                'average' => $student->reportCard($term)['average'] ?? -1
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

        return $reports->sortBy('rank')->values();
    }

    public function yearReportCards(Grade $grade)
    {
        $students = $grade->students()->get();

        $reports = $students->map(function ($student) {
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

        return $sorted->sortBy('rank')->values();
    }
}
