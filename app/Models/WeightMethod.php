<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WeightMethod extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name'
    ];

    public function weightRecords()
    {
        return $this->hasMany(WeightRecord::class);
    }
}
