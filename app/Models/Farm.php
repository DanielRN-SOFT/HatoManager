<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Farm extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'city',
        'department',
        'area',
        'target_weight',
        'price_weight'
    ];


    public function users()
    {
        return $this->belongsToMany(Farm::class);
    }
}
