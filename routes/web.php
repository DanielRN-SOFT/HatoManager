    <?php

    use App\Http\Controllers\AnimalController;
    use App\Http\Controllers\EcommerceController;
    use App\Http\Controllers\EcommerceSalesController;
    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\SelectFarmController;
    use App\Http\Controllers\VeterinarianController;
    use App\Http\Controllers\FarmController;
    use App\Http\Controllers\HealthRecordController;
    use App\Http\Controllers\CartController;
    use App\Http\Controllers\SalesController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\TwoFactorController;
    use App\Http\Controllers\WeightRecordController;
    use Inertia\Inertia;

    Route::get('/', [EcommerceController::class, 'index'])->name('ecommerce.index');
    Route::get('/sales', [EcommerceSalesController::class, 'index'])->name('ecommerce.sales.index');
    Route::get('/sales/animales/{id}', [EcommerceSalesController::class, 'show'])->name('ecommerce.sales.show');



    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/dashboard', function () {

        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    // ─────────────────────────────────────────────
    // Rutas para solo usuario autenticado
    // ─────────────────────────────────────────────


    Route::middleware(['auth'])->group(function () {
        Route::get('/user/two-factor', [TwoFactorController::class, 'show'])
            ->name('two-factor.show');
    });

    // ─────────────────────────────────────────────
    // Rutas para usuario autenticado y que tiene correo verificado
    // ─────────────────────────────────────────────
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::get('/my-orders', [EcommerceSalesController::class, 'showOrderHistory'])
            ->name('orders.history');

        Route::post('/orders/{id}/cancel', [EcommerceSalesController::class, 'cancelOrder'])
            ->name('orders.cancel');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::middleware('role:ganadero')->group(function () {

            // Listado general (todas las fincas del ganadero)
            Route::get('/my-veterinarians', [VeterinarianController::class, 'index'])
                ->name('veterinarians.index');

            // Invitar a un veterinario a una finca específica
            Route::post('/fincas/{farm}/veterinarians/invitar', [VeterinarianController::class, 'invite'])
                ->name('veterinarians.invite');

            // Desvincular veterinario de una finca
            Route::delete('/fincas/{farm}/veterinarians/{veterinarian}', [VeterinarianController::class, 'unlink'])
                ->name('veterinarians.unlink');

            // Cancelar invitación pendiente
            Route::delete('/invitaciones/{invitation}/cancelar', [VeterinarianController::class, 'cancelInvitation'])
                ->name('veterinarians.invitation.cancel');
        });

        /* ── Respuesta a invitación (rol veterinario autenticado) ── */
        Route::get('/invitaciones/{invitation}/{action}', [VeterinarianController::class, 'respond'])
            ->name('veterinarians.invitation.respond')
            ->where('action', 'accept|reject')
            ->middleware('role:veterinario');

        Route::post('notifications/read-all', function () {
            auth()->user()->unreadNotifications->markAsRead();
            return response()->noContent();
        })->name('notifications.readAll');

        Route::post('notifications/{id}/read', function (string $id) {
            auth()->user()->notifications()->findOrFail($id)->markAsRead();
            return response()->noContent();
        })->name('notifications.read');

        // ── SOLO DESARROLLO, PARA PROBAR EMAILS — eliminar antes de producción ──
        Route::get('/test-emails', function () {
            if (!app()->isLocal()) abort(404);

            $farm = App\Models\Farm::first();
            $ganadero = App\Models\User::where('email', 'ganadero@gmail.com')->first();

            $ganadero->notify(new App\Notifications\VeterinarianInvitationNewUser($farm, $ganadero, 'token-de-prueba-123'));
            $ganadero->notify(new App\Notifications\VeterinarianInvitationExistingUser($farm, $ganadero, 999));
            $ganadero->notify(new App\Notifications\VeterinarianUnlinkedFromFarm($farm));

            return response()->json(['sent' => 3, 'to' => $ganadero->email]);
        })->middleware('auth');

        // ── Panel del ganadero ──────────────────────────────────────────
        Route::get('/my-sales', [EcommerceSalesController::class, 'sellerOrders'])->name('seller.orders');
        Route::post('/seller/animal-order/{id}/confirm', [EcommerceSalesController::class, 'confirmAnimalOrder'])->name('seller.animal-order.confirm');
        Route::post('/seller/animal-order/{id}/reject',  [EcommerceSalesController::class, 'rejectAnimalOrder'])->name('seller.animal-order.reject');
    });

    // ─────────────────────────────────────────────
    // Rutas para ganadero
    // ─────────────────────────────────────────────
    Route::middleware(['auth', 'verified', 'role:ganadero'])->group(function () {
        // animales
        Route::resource('animals', AnimalController::class)->except(['index']);
        Route::put('/animals/{animal}/restore', [AnimalController::class, 'restore'])->name('animals.restore')->withTrashed();

        // Pesajes
        Route::resource('/weight-records', WeightRecordController::class)->except(['index']);
        Route::put('/weight-records/{weightRecord}/restore', [WeightRecordController::class, 'restore'])
            ->name('weight-records.restore')
            ->withTrashed();

        // Pedidos - Transacciones
        Route::get('/mis-transacciones', [SalesController::class, 'index'])->name('sales.index');
    });

    // ─────────────────────────────────────────────
    // Rutas para ganadero y veterinario
    // ─────────────────────────────────────────────
    Route::middleware(['auth', 'verified', 'role:ganadero|veterinario'])->group(function () {
        // Seleccionar fincas en auth
        Route::get('/select-farm', [SelectFarmController::class, 'index'])->name('select-farm.index');
        Route::post('/select-farm', [SelectFarmController::class, 'store'])->name('select-farm.store');

        // Fincas
        Route::get('/mis-fincas', [FarmController::class, 'index'])->name('farms.index');
        Route::post('/mis-fincas', [FarmController::class, 'store'])->name('farms.store');
        Route::put('/mis-fincas/{farm}', [FarmController::class, 'update'])->name('farms.update');
        Route::delete('/mis-fincas/{farm}', [FarmController::class, 'destroy'])->name('farms.destroy');
        Route::post('/mis-fincas/{farm}/activar', [FarmController::class, 'setActive'])->name('farms.setActive');
        Route::get('/mis-fincas/list', [FarmController::class, 'list'])->name('farms.list');

        // Sanidad
        Route::resource('sanidad', HealthRecordController::class)->parameters(['sanidad' => 'health'])->names('health');

        // Animales
        Route::get('/animals', [AnimalController::class, 'index'])->name('animals.index');
        Route::get('/animals/{animal}/certificado', [HealthRecordController::class, 'certificadoIndividual'])->name('health.certificado.individual');

        // Pesajes
        Route::get('/weight-records', [WeightRecordController::class, 'index'])->name('weight-records.index');

        // Cerficado de finca
        Route::get('/fincas/{farm}/certificado-lote', [HealthRecordController::class, 'certificadoLote'])->name('health.certificado.lote');
        Route::put('/farms/{id}/restore', [FarmController::class, 'restore'])->name('farms.restore');
    });

    // ─────────────────────────────────────────────
    // Carrito de compras — requiere autenticación
    // ─────────────────────────────────────────────
    Route::middleware(['auth'])->prefix('carrito')->name('cart.')->group(function () {
        Route::get('/',            [CartController::class, 'index'])->name('index');
        Route::post('/agregar',    [CartController::class, 'add'])->name('add');
        Route::delete('/{itemId}', [CartController::class, 'remove'])->name('remove');
        Route::get('/sync',        [CartController::class, 'sync'])->name('sync');
    });

    // ── Checkout con Wompi ──────────────────────────────────────────
    Route::middleware(['auth', 'verified'])->prefix('checkout')->name('checkout.')->group(function () {
        Route::get('/',          [App\Http\Controllers\CheckoutController::class, 'index'])->name('index');
        Route::get('/resultado', [App\Http\Controllers\CheckoutController::class, 'result'])->name('result');
    });

    // ── Webhook Wompi (sin auth, verificación por firma) ──────────
    Route::post('/webhook/wompi', [App\Http\Controllers\CheckoutController::class, 'webhook'])
        ->name('webhook.wompi');

    require __DIR__ . '/auth.php';
