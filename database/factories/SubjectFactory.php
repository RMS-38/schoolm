<?php

namespace Database\Factories;

use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Bible',
                'MLG',
                'French',
                'English',
                'MATH',
                'PC',
                'LES(svt)',
                'HG',
                'PE(eps)'
            ]),
            'desc' => '6-3',
            'weight' => fake()->randomElement([.5, 1, 2, 3, 4, 5, 6]),
        ];
    }
}
