<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductiveStage extends Model
{
    protected $fillable = [
        'name',
        'lactation_days',
        'number_of_births'
    ];
}
