<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        abort_unless($user->hasRole(['admin', 'ganadero']), 403);

        $query = Transaction::with(['order.user', 'transaccionOriginal', 'reembolsos'])
            ->orderByDesc('transaction_date');

        // El ganadero solo ve las de sus órdenes
        if ($user->hasRole('ganadero')) {
            $farmIds = $user->farms()->pluck('farms.id');
            $animalIds = \App\Models\Animal::whereIn('farm_id', $farmIds)
                ->withTrashed()->pluck('id');
            $orderIds = \App\Models\Order::whereHas(
                'animals',
                fn($q) => $q->whereIn('animals.id', $animalIds)
            )->pluck('id');

            $query->whereHas('order', fn($q) => $q->whereIn('id', $orderIds));
        }

        // Filtros opcionales
        if ($request->filled('status')) {
            $query->where('transaction_status', $request->status);
        }
        if ($request->filled('type')) {
            $query->where('transaction_type', $request->type);
        }

        $transactions = $query->paginate(20)->through(fn($tx) => [
            'id' => $tx->id,
            'wompi_id' => $tx->wompi_id,
            'internal_reference' => $tx->internal_reference,
            'transaction_date' => $tx->transaction_date?->format('d/m/Y H:i'),
            'amount' => $tx->amount,
            'moneda' => $tx->moneda,
            'transaction_status' => $tx->transaction_status,
            'transaction_type' => $tx->transaction_type,
            'motivo_reembolso' => $tx->motivo_reembolso,
            'order' => $tx->order ? [
                'id' => $tx->order->id,
                'reference' => $tx->order->reference,
                'comprador' => $tx->order->user?->name,
            ] : null,
            'transaccion_original_id' => $tx->transaction_id,
            'reembolsos_count' => $tx->reembolsos->count(),
        ]);

        return Inertia::render('Transacciones/Index', [
            'transactions' => $transactions,
            'filters' => $request->only(['status', 'type']),
        ]);
    }
}
