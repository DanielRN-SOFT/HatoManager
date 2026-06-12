<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'cart_id',
        'animal_id',
        'price_snapshot',
    ];

    protected $casts = [
        'price_snapshot' => 'float',
    ];

    /* ── Relaciones ─────────────────────────────────────────── */

    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class);
    }

    public function animal(): BelongsTo
    {
        // withTrashed para poder detectar animales eliminados
        // y mostrar la alerta en el carrito
        return $this->belongsTo(Animal::class)->withTrashed();
    }
}
