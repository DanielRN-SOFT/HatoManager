<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'animal_id',
        'registered_by',
        'type',
        'product',
        'dose',
        'applied_at',
        'next_date',
        'notes',
    ];

    protected $casts = [
        'applied_at' => 'date',
        'next_date'  => 'date',
    ];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    public function registeredBy()
    {
        return $this->belongsTo(User::class, 'registered_by');
    }

    public function alert()
    {
        return $this->hasOne(HealthAlert::class);
    }
}
