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
        'type_of_grass',
        'capacity',
        'farm_id'
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }
}
