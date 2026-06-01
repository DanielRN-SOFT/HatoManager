<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Animal extends Model implements HasMedia
{
    use InteractsWithMedia;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'ear_tag',
        'breed_id',
        'sex',
        'photo',
        'birth_date',
        'status',
        'description',
        'previous_diseases',
        'price',
        'target_weight',
        'price_weight',
        'publication_date',
        'farm_id',
        'animal_category_id',
        'reason_to_eliminate'
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

    public function healthRecords()
    {
        return $this->hasMany(HealthRecord::class)->latest();
    }

    protected $casts = [
        'birth_date' => 'date',   // or 'datetime'
    ];
}
