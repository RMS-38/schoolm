<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return Inertia::render('dashboard', [
            'grade_count' => Grade::count(),
            'student_count' => Student::count(),
            'subject_count' => Subject::count(),
        ]);
    }
}
