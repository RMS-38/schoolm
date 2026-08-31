<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class SingleMarkRequest extends FormRequest
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
            "subject_id" => ['required'],
            "grade" => ['required'],
            "term" => ['required'],
            "weight" => ['required', "min:0.5"],
            "mark" => ['required', "min:0"]
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $weight = $this->input('weight');
            $max =  $weight * 20;
            $mark = $this->input('mark');
            if ($mark > $max) {
                $validator->errors()->add(
                    'mark',
                    "The mark cannot  exceed $max."
                );
            }
        });
    }
}
