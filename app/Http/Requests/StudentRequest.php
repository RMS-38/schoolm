<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
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
            'grade_id' => ['required'],
            'name' => ['required', 'string', 'max:256'],
            'gender' => ['required', 'in:boy,girl'],
            'dob' => ['required', 'date'],
            'pob' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:256'],
            'phone' => ['nullable', 'regex:/^\+?[0-9\s]{7,15}$/'],
            'email' => ['nullable', 'string', 'email', 'max:256'],
            'photo' => ['nullable', 'mimes:png,jpg,jpeg,webp,tiff', 'max:2048']
        ];
    }
}
