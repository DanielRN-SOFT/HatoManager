<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthAlert extends Model
{
    protected $fillable = [
        'health_record_id',
        'animal_id',
        'type',
        'alert_date',
        'status',
    ];

    protected $casts = [
        'alert_date' => 'date',
    ];

    public function healthRecord()
    {
        return $this->belongsTo(HealthRecord::class);
    }

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }
}
