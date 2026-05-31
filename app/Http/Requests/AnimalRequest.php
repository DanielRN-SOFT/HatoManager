<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Override;

class AnimalRequest extends FormRequest
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
            'name' => [
                'required',
                'string',
                'max:200'
            ],
            'price' => [
                'required',
                'numeric'
            ],
            'target_weight' => [
                'required',
                'numeric',
                'integer'
            ],
            'price_weight' => [
                'required',
                'numeric'
            ],
            'ear_tag' => [
                'required',
                'integer',
                Rule::unique('animals', 'ear_tag')->ignore($this->animal)
            ],
            'sex' => [
                'required',
                'in:M,H'
            ],
            'birth_date' => [
                'required',
                'date'
            ],
            'breed_id' => [
                'required',
                'exists:breeds,id'
            ],
            'animal_category_id' => [
                'required',
                'exists:animal_categories,id'
            ],
            'photo' => [
                'nullable',
                'image',
                'max:4096',
                'mimes:png,jpg,webp'
            ]
        ];
    }

    #[Override]
    public function attributes()
    {
        return [
            'ear_tag' => "No. de Arete",
            'sex' => "genero",
            'status' => 'estado',
            'animal_category_id' => "categoria de animal",
            'birth_date' => "fecha de nacimiento"
        ];
    }
}
