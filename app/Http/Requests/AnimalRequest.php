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
        $farm_id = session('active_farm_id');
        return [
            'name' => [
                'required',
                'string',
                'max:200'
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
                Rule::unique('animals', 'ear_tag')
                    ->ignore($this->animal)
                    ->where('farm_id', $farm_id)
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
            ],
            "reason_to_death" => [
                'nullable'
            ],
            'paddock_id' => [
                'required',
                'exists:paddocks,id'
            ],
            'status' => [
                'nullable'
            ],
            'price' => [
                'nullable',
                'numeric',
                'min:0'
            ],
        ];
    }

    #[Override]
    public function attributes()
    {
        return [
            'ear_tag' => "No. de Arete",
            'sex' => "genero",
            'status' => 'estado',
            'animal_category_id' => "categoria del animal",
            'breed_id' => 'raza del animal',
            'paddock_id' => "lote del animal",
            'birth_date' => "fecha de nacimiento",
            'target_weight' => "peso objectivo",
            'price_weight' => "precio por peso"
        ];
    }

    #[Override]
    protected function prepareForValidation()
    {
        $priceWeight = (float) $this->price_weight;
        $targetWeight = (float) $this->target_weight;

        $this->merge([
            'price' => $priceWeight > 0 && $targetWeight > 0 ? round($priceWeight * $targetWeight, 2) : 0,
            'status' => $this->publication_date ? 'Publicado' : $this->status
        ]);
    }
}
