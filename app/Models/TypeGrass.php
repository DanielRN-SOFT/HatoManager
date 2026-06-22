<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class TypeGrass extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
    ];

    public function paddocks() {
        return $this->hasMany(Paddock::class);
    }
}
