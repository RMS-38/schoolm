<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Subject;
use Database\Factories\GradeFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Grade::factory(4)->create()->each(function ($grade) {
            $subjects = Subject::inRandomOrder()->take(rand(4, 5))->pluck('id');
            $grade->subjects()->attach($subjects);
        });
    }
}
