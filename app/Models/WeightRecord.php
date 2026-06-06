<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WeightRecord extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'weight_date',
        'weight',
        'body_condition_score',
        'observations',
        'animal_id',
        'productive_stage_id',
        'weight_method_id',
        'previous_fast',
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

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
