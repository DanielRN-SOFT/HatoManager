<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SalesController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        abort_unless($user->hasRole('ganadero'), 403);

        $farmIds   = $user->farms()->pluck('farms.id');
        $animalIds = Animal::whereIn('farm_id', $farmIds)->withTrashed()->pluck('id');
        $tab       = $request->input('tab', 'ventas');

        // ── Stats (sin paginar, sobre toda la data) ──
        $salesAll     = Order::where('orders.user_id', '!=', $user->id)
            ->whereHas('animals', fn($q) => $q->whereIn('animals.id', $animalIds))
            ->withCount('animals')
            ->with('transaction')
            ->orderByDesc('date')
            ->get();

        $purchasesAll = Order::where('user_id', $user->id)
            ->whereHas('animals', fn($q) => $q->whereNotIn('animals.id', $animalIds))
            ->withCount('animals')
            ->with('transaction')
            ->orderByDesc('date')
            ->get();

        $allOrders = $salesAll->concat($purchasesAll);

        $txCount = fn(string $status) => $allOrders->filter(
            fn($o) => $o->transaction?->transaction_status === $status
        )->count();

        $stats = [
            'total_sales'                => $salesAll->count(),
            'total_sales_amount'         => $salesAll->sum('subtotal'),
            'total_purchases'            => $purchasesAll->count(),
            'total_purchases_amount'     => $purchasesAll->sum('subtotal'),
            'total_animals'              => $salesAll->sum('animals_count') + $purchasesAll->sum('animals_count'),
            'pending'                    => $allOrders->filter(fn($o) => $o->bussiness_status === 'Pendiente de confirmacion')->count(),
            'confirmed_sales_amount'     => $salesAll->filter(fn($o) => $o->transaction?->transaction_status === 'aprobada')->sum('subtotal'),
            'confirmed_purchases_amount' => $purchasesAll->filter(fn($o) => $o->transaction?->transaction_status === 'aprobada')->sum('subtotal'),
            'transactions' => [
                'aprobadas'    => $txCount('aprobada'),
                'pendientes'   => $txCount('pendiente'),
                'rechazadas'   => $txCount('rechazada'),
                'reembolsadas' => $txCount('reembolsada'),
                'expiradas'    => $txCount('expirada'),
                'sin_pago'     => $allOrders->filter(fn($o) => is_null($o->transaction))->count(),
            ],
        ];

        // ── Helper para mapear orden ──
        $mapOrder = fn($o, $isSale) => [
            'id'               => $o->id,
            'reference'        => $o->reference,
            'date'             => $o->date,
            'bussiness_status' => $o->bussiness_status,
            'payment_status'   => $o->payment_status,
            'subtotal'         => $o->subtotal,
            'animals_count'    => $o->animals_count,
            'counterpart_name' => $isSale ? $o->user?->name : null,
            'animals'          => $o->animals->map(fn($a) => [
                'id'          => $a->id,
                'ear_tag'     => $a->ear_tag,
                'sex'         => $a->sex,
                'status'      => $a->status,
                'breed'       => $a->breed?->name,
                'category'    => $a->animalCategory?->name,
                'pivot_price' => $a->pivot->snapshot_price ?? $a->price,
            ])->values(),
            'transaction' => $o->transaction ? [
                'wompi_id'           => $o->transaction->wompi_id,
                'transaction_date'   => $o->transaction->transaction_date,
                'amount'             => $o->transaction->amount,
                'moneda'             => $o->transaction->moneda,
                'transaction_status' => $o->transaction->transaction_status,
                'transaction_type'   => $o->transaction->transaction_type,
            ] : null,
        ];

        // ── Paginación del tab activo ──
        $salesQuery = Order::with(['user:id,name', 'transaction', 'animals' => fn($q) => $q->with(['breed:id,name', 'animalCategory:id,name'])->withTrashed()])
            ->withCount('animals')
            ->where('orders.user_id', '!=', $user->id)
            ->whereHas('animals', fn($q) => $q->whereIn('animals.id', $animalIds))
            ->orderByDesc('date');

        $purchasesQuery = Order::with(['transaction', 'animals' => fn($q) => $q->with(['breed:id,name', 'animalCategory:id,name'])->withTrashed()])
            ->withCount('animals')
            ->where('user_id', $user->id)
            ->whereHas('animals', fn($q) => $q->whereNotIn('animals.id', $animalIds))
            ->orderByDesc('date');

        $sales     = $salesQuery->paginate(10, ['*'], 'sales_page')->through(fn($o) => $mapOrder($o, true));
        $purchases = $purchasesQuery->paginate(10, ['*'], 'purchases_page')->through(fn($o) => $mapOrder($o, false));

        return Inertia::render('Ventas/Index', [
            'sales'     => $sales,
            'purchases' => $purchases,
            'stats'     => $stats,
            'tab'       => $tab,
        ]);
    }
}
