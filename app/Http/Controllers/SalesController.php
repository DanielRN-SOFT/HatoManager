<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        abort_unless($user->hasRole('ganadero'), 403);

        // IDs de fincas y animales del ganadero (igual que tu compañero)
        $farmIds   = $user->farms()->pluck('farms.id');
        $animalIds = Animal::whereIn('farm_id', $farmIds)->withTrashed()->pluck('id');

        // ── VENTAS: órdenes que contienen animales del ganadero, creadas por otro ──
        $salesRaw = Order::with(['user:id,name', 'transaction'])
            ->withCount('animals')
            ->where('orders.user_id', '!=', $user->id)
            ->whereHas('animals', function ($q) use ($animalIds) {
                $q->whereIn('animals.id', $animalIds);
            })
            ->orderByDesc('date')
            ->get()
            ->map(function ($o) {
                return [
                    'id'               => $o->id,
                    'reference'        => $o->reference,
                    'date'             => $o->date,
                    'bussiness_status' => $o->bussiness_status,
                    'payment_status'   => $o->payment_status,
                    'subtotal'         => $o->subtotal,
                    'animals_count'    => $o->animals_count,
                    'counterpart_name' => $o->user ? $o->user->name : null,
                    'transaction'      => $o->transaction ? [
                        'wompi_id'           => $o->transaction->wompi_id,
                        'transaction_date'   => $o->transaction->transaction_date,
                        'amount'             => $o->transaction->amount,
                        'moneda'             => $o->transaction->moneda,
                        'transaction_status' => $o->transaction->transaction_status,
                        'transaction_type'   => $o->transaction->transaction_type,
                    ] : null,
                ];
            });

        // ── COMPRAS: órdenes creadas por el ganadero con animales ajenos ──
        $purchasesRaw = Order::with(['transaction'])
            ->withCount('animals')
            ->where('user_id', $user->id)
            ->whereHas('animals', function ($q) use ($animalIds) {
                $q->whereNotIn('animals.id', $animalIds);
            })
            ->orderByDesc('date')
            ->get()
            ->map(function ($o) {
                return [
                    'id'               => $o->id,
                    'reference'        => $o->reference,
                    'date'             => $o->date,
                    'bussiness_status' => $o->bussiness_status,
                    'payment_status'   => $o->payment_status,
                    'subtotal'         => $o->subtotal,
                    'animals_count'    => $o->animals_count,
                    'counterpart_name' => null,
                    'transaction'      => $o->transaction ? [
                        'wompi_id'           => $o->transaction->wompi_id,
                        'transaction_date'   => $o->transaction->transaction_date,
                        'amount'             => $o->transaction->amount,
                        'moneda'             => $o->transaction->moneda,
                        'transaction_status' => $o->transaction->transaction_status,
                        'transaction_type'   => $o->transaction->transaction_type,
                    ] : null,
                ];
            });

        // ── Stats ──
        $allOrders = $salesRaw->concat($purchasesRaw);

        $txCount = function (string $status) use ($allOrders) {
            return $allOrders->filter(function ($o) use ($status) {
                return isset($o['transaction']) && $o['transaction']['transaction_status'] === $status;
            })->count();
        };

        $stats = [
            'total_sales'            => $salesRaw->count(),
            'total_sales_amount'     => $salesRaw->sum('subtotal'),
            'total_purchases'        => $purchasesRaw->count(),
            'total_purchases_amount' => $purchasesRaw->sum('subtotal'),
            'total_animals'          => $salesRaw->sum('animals_count') + $purchasesRaw->sum('animals_count'),

            'pending' => $allOrders->filter(function ($o) {
                return $o['bussiness_status'] === 'Pendiente de confirmacion';
            })->count(),

            'transactions' => [
                'aprobadas'    => $txCount('aprobada'),
                'pendientes'   => $txCount('pendiente'),
                'rechazadas'   => $txCount('rechazada'),
                'reembolsadas' => $txCount('reembolsada'),
                'expiradas'    => $txCount('expirada'),
                'sin_pago'     => $allOrders->filter(function ($o) {
                    return is_null($o['transaction']);
                })->count(),
            ],

            'confirmed_sales_amount' => $salesRaw->filter(function ($o) {
                return isset($o['transaction']) && $o['transaction']['transaction_status'] === 'aprobada';
            })->sum('subtotal'),

            'confirmed_purchases_amount' => $purchasesRaw->filter(function ($o) {
                return isset($o['transaction']) && $o['transaction']['transaction_status'] === 'aprobada';
            })->sum('subtotal'),
        ];

        return Inertia::render('Ventas/Index', [
            'sales'     => $salesRaw,
            'purchases' => $purchasesRaw,
            'stats'     => $stats,
        ]);
    }
}
