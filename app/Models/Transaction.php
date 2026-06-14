<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'deposit_id',
        'transaction_id',
        'wompi_id',
        'internal_reference',
        'transaction_date',
        'moneda',
        'amount',
        'transaction_status',
        'transaction_type',
    ];

    protected $casts = [
        'transaction_date' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
}
