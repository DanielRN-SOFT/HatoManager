<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductiveStage extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'lactation_days',
        'number_of_births'
    ];

    public function weightRecords()
    {
        return $this->hasMany(WeightRecord::class);
    }
}
