<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeightRecord extends Model
{
    protected $fillable = [
        'weight_date',
        'weight',
        'body_condition_score',
        'observations',
        'animals_id',
        'productive_stages_id',
        'weight_methods_id',
        'previous_fast',
        'pregnancy',
        'lactation_days',
        'number_of_births',
        'room_temperature'
    ];

    public function weightMethod()
    {
        return $this->belongsTo(WeightMethod::class);
    }

    public function productiveStage()
    {
        return $this->belongsTo(ProductiveStage::class);
    }
}
