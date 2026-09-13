<?php

namespace App\Http\Controllers;

use App\Http\Requests\MarkRequest;
use App\Http\Requests\SingleMarkRequest;
use App\Models\Grade;
use App\Models\Mark;
use App\Models\Student;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MarkRequest $request, Student $student)
    {
        $validated = $request->validated();

        foreach ($validated['marks'] as $subjectId => $value) {
            // dd($validated['weights'][$subjectId]);
            $student->marks()->updateOrCreate(
                [
                    'subject_id' => $subjectId,
                    'grade_id' => $student->grade_id,
                    'term' => $validated['term'],
                ],
                [
                    'value' => $value,
                    'weight' => $validated['weights'][$subjectId]
                ]
            );
        }

        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student, int $term)
    {
        $student->load('grade.subjects');
        $grade = $student->grade;
        return Inertia::render('grade/studentMark', [
            'student' => $student,
            'term' => $term ?? 1,
            'term_1' => $student->reportCard(1),
            'term_2' => $student->reportCard(2),
            'term_3' => $student->reportCard(3),
            'year' => $student->yearReportCard()['year_average'],
            'ranks' => $student->ranks(),
            'grade' => $grade,
        ]);
    }

    public function cardPdf(Student $student, int $term)
    {
        $student->load('grade.subjects');
        $grade = $student->grade;
        // dd($student->reportCard(1));
        $pdf = Pdf::loadView('pdf.mark', [
            'student' => $student,
            'term' => $term ?? 1,
            'term_1' => $student->reportCard(1),
            'term_2' => $student->reportCard(2),
            'term_3' => $student->reportCard(3),
            'year' => $student->yearReportCard()['year_average'],
            'ranks' => $student->ranks(),
            'grade' => $grade,
        ])
            ->setPaper('a4', 'landscape');

        return $pdf->stream('mark.pdf');
    }

    public function cardsPdf(Grade $grade, int $term)
    {
        $grade->load('subjects');

        $reports = $grade->reportCards($term);

        $pdf = Pdf::loadView('pdf.term', [
            'reports' => $reports,
            'grade' => $grade,
            'subjects' => $grade->subjects()->get()->toArray(),
            'term' => $term,
        ])->setPaper('a4', 'portrait');

        return $pdf->stream('reports.pdf');
    }

    public function reportYearPdf(Grade $grade)
    {
        $year = $grade->yearReportCards();

        $pdf = Pdf::loadView('pdf.year', [
            'reports' => $year,
            'grade' => $grade
        ])->setPaper('a4');

        return $pdf->stream('reportsYear.pdf');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mark $mark)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SingleMarkRequest $request, Student $student)
    {
        $validated = $request->validated();
        $student->marks()->updateOrCreate(
            [
                'subject_id' => $validated['subject_id'],
                'grade_id' => $student->grade_id,
                'term' => $validated['term'],
            ],
            [
                'value' => $validated['mark'],
                'weight' => $validated['weight']
            ]
        );
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Mark $mark)
    {
        //
    }
}
