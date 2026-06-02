<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paddock extends Model
{
    protected $fillable = [
        'name',
        'area',
        'type_of_grass',
        'capacity',
        'farm_id'
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }
}
