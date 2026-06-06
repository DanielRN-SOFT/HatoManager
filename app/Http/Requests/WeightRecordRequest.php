<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Override;

class WeightRecordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();

        if ($user->hasRole(['ganadero', 'veterinario'])) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'animal_id' => 'required|numeric|exists:animals,id',
            'weight_date' => 'required|date|before_or_equal:now',
            'weight' => 'required|numeric',
            'productive_stage_id' => 'required|numeric|exists:productive_stages,id',
            'body_condition_score' => 'required|numeric',
            'weight_method_id' => 'required|numeric|exists:weight_methods,id',
            'room_temperature' => 'required|numeric',
            'previous_fast' => 'required|numeric',
            'observations' => 'nullable|string'
        ];
    }

    #[Override]
    public function attributes()
    {
        return [
            'productive_stage_id' => "etapa productiva",
            'body_condition_score' => "condicion corporal",
            'weight_method_id' => 'metodo de pesaje',
            'room_temperature' => "temperatura ambiente",
            "previous_fast" => "ayuno previo",
            'weight_date' => "fecha de pesaje",
            'weight' => "peso",
            'animal_id' => "animal"

        ];
    }
}
