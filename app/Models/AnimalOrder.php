<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class AnimalOrder extends Pivot
{
    protected $table = 'animal_order';

    public $incrementing = true;

    protected $fillable = [
        'animal_id',
        'order_id',
        'user_id',
        'status_order',
        'snapshot_price',
    ];

    protected $casts = [
        'snapshot_price' => 'decimal:2',
    ];

    public function animal()
    {
        return $this->belongsTo(Animal::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
