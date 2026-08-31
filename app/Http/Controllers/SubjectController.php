<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectRequest;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubjectController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware(['auth', 'verified'])
    //         ->only(['create', 'store', 'edit', 'update', 'destroy']);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = Subject::paginate(8);
        return Inertia::render('subject/index', [
            'subjects' => $subjects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubjectRequest $request)
    {
        Subject::create($request->validated());
        return Inertia::flash('status', 'Subject Created successfully')->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubjectRequest $request, Subject $subject)
    {
        $subject->update($request->validated());
        return Inertia::flash('status', 'Subject updated successfully')->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subject $subject)
    {
        $subject->delete();
        return Inertia::flash('status', 'Subject deleted successfully')->back();
    }
}
