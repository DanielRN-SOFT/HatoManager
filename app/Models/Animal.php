<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    protected $fillable = [
        'name',
        'ear_tag',
        'breed',
        'sex',
        'photo',
        'birth_date',
        'status',
        'description',
        'previous_diseases',
        'price',
        'target_weight',
        'publication_date',
        'farm_id',
        'animal_category_id'
    ];



    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }

    public function animalCategory()
    {
        return $this->belongsTo(AnimalCategory::class);
    }
}
