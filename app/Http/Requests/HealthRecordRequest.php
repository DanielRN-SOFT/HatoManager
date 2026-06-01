<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class HealthRecordRequest extends FormRequest
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
            'animal_id'  => ['required', 'exists:animals,id'],
            'type'       => ['required', 'in:vacuna,desparasitacion,tratamiento'],
            'product'    => ['required', 'string', 'max:255'],
            'dose'       => ['required', 'string', 'max:255'],
            'applied_at' => ['required', 'date'],
            'next_date'  => ['nullable', 'date', 'after:applied_at'],
            'notes'      => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'animal_id.required'  => 'El animal es obligatorio.',
            'animal_id.exists'    => 'El animal no existe.',
            'type.required'       => 'El tipo es obligatorio.',
            'type.in'             => 'Tipo inválido.',
            'product.required'    => 'El producto es obligatorio.',
            'dose.required'       => 'La dosis es obligatoria.',
            'applied_at.required' => 'La fecha de aplicación es obligatoria.',
            'next_date.after'     => 'La próxima fecha debe ser posterior a la de aplicación.',
        ];
    }
}
