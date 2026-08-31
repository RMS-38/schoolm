<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MarkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'term' => ['required', 'in:1,2,3,4'],
            'marks' => ['required', 'array'],
            'weights' => ['required', 'array'],
            'marks.*' => ['numeric', 'min:0'],
            'weights.*' => ['numeric', 'min:0.5'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $marks = $this->input('marks', []);
            $weights = $this->input('weights', []);

            foreach ($marks as $subjectId => $mark) {
                $weight = $weights[$subjectId] ?? 1;
                $max = 20 * $weight;

                if ($mark > $max) {
                    $validator->errors()->add(
                        "marks.$subjectId",
                        "The grade for the subject $subjectId cannot exceed $max"
                    );
                }
            }
        });
    }
}
