<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnimalCategory extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name'
    ];

    public function animals()
    {
        return $this->hasMany(Animal::class);
    }
}
