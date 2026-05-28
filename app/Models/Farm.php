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
        return $this->belongsToMany(User::class);
    }

    public function veterinarios()
    {
        return $this->belongsToMany(User::class)->whereHas('roles', fn($q) => $q->where('name', 'veterinario'));
    }
    public function veterinarianInvitations()
    {
        return $this->hasMany(VeterinarianInvitation::class);
    }
}
