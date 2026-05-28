<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VeterinarianInvitation extends Model
{
    protected $fillable = [
        'farm_id',
        'invited_by',
        'email',
        'token',
        'token_expires_at',
        'status',
    ];

    protected $casts = [
        'token_expires_at' => 'datetime',
    ];

    /* ─── Relaciones ─────────────────────────────────────────── */

    public function farm(): BelongsTo
    {
        return $this->belongsTo(Farm::class);
    }

    public function invitedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    /* ─── Helpers ────────────────────────────────────────────── */

    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isExpired(): bool
    {
        return $this->token_expires_at !== null
            && $this->token_expires_at->isPast();
    }
}
