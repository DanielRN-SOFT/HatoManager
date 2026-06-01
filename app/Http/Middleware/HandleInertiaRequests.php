<?php

namespace App\Http\Middleware;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        // Finca activa desde sesión
        $activeFarm = null;
        if ($user) {
            $farmId = session('active_farm_id');
            if ($farmId) {
                $activeFarm = $user->farms()
                    ->where('farms.id', $farmId)
                    ->whereNull('farms.deleted_at')
                    ->first(['farms.id', 'farms.name', 'farms.city', 'farms.department']);
            }

            // Si la finca en sesión ya no es válida, limpiarla
            if ($farmId && ! $activeFarm) {
                session()->forget('active_farm_id');
            }
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user'  => $user,
                'roles' => $user?->getRoleNames() ?? [],
            ],
            'activeFarm' => $activeFarm,
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'flash'  => [
                'success' => session('success'),
                'info'    => session('info'),
                'error'   => session('error'),
            ],
            'notifications' => function () {
                if (!auth()->check()) return ['unread_count' => 0, 'items' => []];

                $notifications = auth()->user()
                    ->unreadNotifications()
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(fn($n) => [
                        'id'        => $n->id,
                        'mensaje'   => $n->data['mensaje'] ?? 'Nueva notificación',
                        'fincas'    => $n->data['total_fincas'] ?? 0,
                        'alertas'   => $n->data['total_alertas'] ?? 0,
                        'created_at' => $n->created_at->diffForHumans(),
                    ]);

                return [
                    'unread_count' => auth()->user()->unreadNotifications()->count(),
                    'items'        => $notifications,
                ];
            },
        ];
    }
}
