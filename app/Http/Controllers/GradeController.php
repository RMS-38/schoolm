<?php

namespace App\Http\Controllers;

use App\Http\Requests\GradeRequest;
use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GradeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $grades = Grade::with('user')->latest('created_at')->paginate(8);
        return Inertia::render('grade/index', [
            'grades' => $grades,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subjects = Subject::all();
        return Inertia::render('grade/create', [
            'subjects' => $subjects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GradeRequest $request)
    {
        // $subjectIds = array_map('intval', $request->input('subjects', []));
        $validated = $request->validated();

        $user = $request->user();
        $grade = $user->grades()->create([
            'name' => $validated['name']
        ]);

        $grade->subjects()->sync($validated['subjects']);

        Inertia::flash('status', 'Grade created successfully');

        return redirect()->route('grade.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Grade $grade)
    {
        $reportCards = $grade->reportCards();
        $term = (int)$request->query('term', 1);
        if ($term !== 4)
            $reportCards = $grade->reportCards($term);

        $grade->load('subjects');
        $students = $grade->students()->paginate(8);

        return Inertia::render('grade/show', [
            'grade' => $grade,
            'students' => $students,
            'reportCards' => $reportCards,
            'yearReportsCards' => $grade->yearReportCards()
        ]);
    }

    public function showStudent(Student $student)
    {
        $student->load('grade');
        return Inertia::render('grade/show-student', [
            'student' => $student
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Grade $grade)
    {
        $grade->load('subjects');
        return Inertia::render('grade/edit', [
            'grade' => $grade,
            'subjects' => Subject::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GradeRequest $request, Grade $grade)
    {
        $validated = $request->validated();
        $grade->update(['name' => $validated['name']]);
        $grade->subjects()->sync($validated['subjects']);

        Inertia::flash('status', 'Grade Updated successfully');

        return redirect()->route('grade.show', $grade);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Grade $grade)
    {
        $grade->delete();
        Inertia::flash('status', 'Grade deleted successfully');

        return redirect()->route('grade.index');
    }
}
