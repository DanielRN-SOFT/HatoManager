<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'date',
        'bussiness_status',
        'payment_status',
        'subtotal',
        'reference',
        'user_id',
        'transaction_id'
    ];

    protected $casts = [
        'date' => 'datetime',
        'subtotal' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function animals()
    {
        return $this->belongsToMany(Animal::class)
            ->using(AnimalOrder::class)
            ->withPivot('user_id', 'status_order', 'snapshot_price')
            ->withTimestamps();
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
