<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use SoftDeletes;

    protected $fillable = ['user_id'];

    /* ── Relaciones ─────────────────────────────────────────── */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /* ── Helpers ─────────────────────────────────────────────── */

    /**
     * Obtiene o crea el carrito del usuario autenticado.
     */
    public static function forUser(int $userId): self
    {
        return self::firstOrCreate(['user_id' => $userId]);
    }

    /**
     * True si el animal ya está en este carrito.
     */
    public function hasAnimal(int $animalId): bool
    {
        return $this->items()->where('animal_id', $animalId)->exists();
    }

    /**
     * Cantidad de ítems activos en el carrito.
     */
    public function getCount(): int
    {
        return $this->items()->count();
    }
}
