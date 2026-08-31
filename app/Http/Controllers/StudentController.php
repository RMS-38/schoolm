<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with('grade')->paginate(10);
        return Inertia::render('student/index', [
            'students' => $students
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('student/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StudentRequest $request)
    {
        $fields = $request->validated();
        if ($request->hasFile('photo')) {
            $fields['photo'] = $request->file('photo')
                ->store('images/student', 'public');
        }

        Student::create($fields);

        Inertia::flash('status', 'Student created successfully');

        return redirect()->route('student.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $student->load('grade');

        return Inertia::render('student/show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $student->load('grade');
        return Inertia::render('student/edit', [
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StudentRequest $request, Student $student)
    {
        $fields = $request->validated();

        if ($request->hasFile('photo')) {

            if ($student->photo) {
                Storage::disk('public')->delete($student->photo);
            }

            $fields['photo'] = $request->file('photo')
                ->store('images/student', 'public');
        }

        $student->update($fields);

        Inertia::flash('status', 'Student updated successfully');

        return redirect()->route('student.show', $student->id);
        // ->with('status', 'Student updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }

        $student->delete();

        Inertia::flash('status', 'Student deleted successfully');

        return redirect()->route('student.index');
    }
}
