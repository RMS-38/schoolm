<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'grade_id' => fake()->randomElement([1, 2, 3]),
            'name' => fake()->name(),
            'gender' => fake()->randomElement(['boy', 'girl']),
            'dob' => fake()->date(),
            'pob' => fake()->city(),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->email(),
            'photo' => null
        ];
    }
}
