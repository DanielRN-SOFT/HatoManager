<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paddock extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'area',
        'type_grass_id',
        'capacity',
        'farm_id'
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }

    public function animals()
    {
        return $this->hasMany(Animal::class);
    }

    public function typeGrass()
    {
        return $this->belongsTo(TypeGrass::class);
    }
}
