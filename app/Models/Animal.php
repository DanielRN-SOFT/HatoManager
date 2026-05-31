<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Animal extends Model implements HasMedia
{
    use InteractsWithMedia;
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

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    protected $casts = [
        'birth_date' => 'date',   // or 'datetime'
    ];
}
