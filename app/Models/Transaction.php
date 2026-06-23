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
        'motivo_reembolso',
    ];

    protected $casts = [
        'transaction_date' => 'datetime',
        'amount'           => 'decimal:2',
    ];

    /** Transacción original a la que este reembolso pertenece */
    public function transaccionOriginal(): BelongsTo
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }

    /** Reembolsos emitidos desde esta transacción */
    public function reembolsos(): HasMany
    {
        return $this->hasMany(Transaction::class, 'transaction_id');
    }

    /** Pedido al que pertenece esta transacción */
    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'transaction_id');
    }
}
