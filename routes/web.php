    <?php

    use App\Http\Controllers\AnimalCategoryController;
    use App\Http\Controllers\AnimalController;
    use App\Http\Controllers\BreedController;
    use App\Http\Controllers\EcommerceController;
    use App\Http\Controllers\EcommerceSalesController;
    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\SelectFarmController;
    use App\Http\Controllers\VeterinarianController;
    use App\Http\Controllers\FarmController;
    use App\Http\Controllers\HealthRecordController;
    use App\Http\Controllers\CartController;
    use App\Http\Controllers\ContactController;
    use App\Http\Controllers\DashboardController;
    use App\Http\Controllers\PaddockController;
    use App\Http\Controllers\PermissionController;
    use App\Http\Controllers\ProductiveStageController;
    use App\Http\Controllers\RoleController;
    use App\Http\Controllers\SalesController;
    use App\Http\Controllers\TransactionController;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\TwoFactorController;
    use App\Http\Controllers\TypeGrassController;
    use App\Http\Controllers\UserController;
    use App\Http\Controllers\WeightMethodController;
    use App\Http\Controllers\WeightRecordController;
    use App\Models\Contact;
    use App\Models\TypeGrass;
    use Inertia\Inertia;

    Route::get('/', [EcommerceController::class, 'index'])->name('ecommerce.index');
    Route::get("/sobre-nosotros", [EcommerceController::class, 'aboutUs'])->name('ecommerce.about.us');
    Route::get("/terminos-de-uso", [EcommerceController::class, 'termsUse'])->name('ecommerce.terms.use');
    Route::get("/privacidad", [EcommerceController::class, 'privacity'])->name('ecommerce.privacity');
    Route::get("/contacto", [ContactController::class, 'create'])->name('contact.create');
    Route::post("/contact", [ContactController::class, 'store'])->name('contact.store');
    Route::get('/ventas', [EcommerceSalesController::class, 'index'])->name('ecommerce.sales.index');
    Route::get('/sales/animales/{id}', [EcommerceSalesController::class, 'show'])->name('ecommerce.sales.show');



    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');


    // ─────────────────────────────────────────────
    // Rutas para solo usuario autenticado
    // ─────────────────────────────────────────────


    Route::middleware(['auth'])->group(function () {
        Route::get('/user/two-factor', [TwoFactorController::class, 'show'])
            ->name('two-factor.show');
    });

    Route::middleware(['auth', 'verified', 'role:ganadero|veterinario|admin'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('/animals/search', [AnimalController::class, 'search'])
            ->name('animals.search');
    });

    Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {

        // Usuarios
        Route::resource('/users', UserController::class);
        Route::put('/usuarios/{id}/restore', [UserController::class, 'restore'])->name('users.restore');

        // Razas
        Route::resource('/breeds', BreedController::class);
        Route::put('/breeds/{id}/restore', [BreedController::class, 'restore'])->name('breeds.restore');

        // Categorias de animales
        Route::resource('/animal-categories', AnimalCategoryController::class);
        Route::put('/animal-categories/{id}/restore', [AnimalCategoryController::class, 'restore'])->name('animal-categories.restore');

        // Etapas productivas
        Route::resource('/productive-stages',  ProductiveStageController::class);
        Route::put('/productive-stages/{id}/restore', [ProductiveStageController::class, 'restore'])->name('productive-stages.restore');

        // Metodos de pesaje
        Route::resource('/weight-methods', WeightMethodController::class);
        Route::put('/weight-methods/{id}/restore', [WeightMethodController::class, 'restore'])->name('weight-methods.restore');

        // Tipos de pasto
        Route::resource('/type-grasses', TypeGrassController::class);
        Route::put("/type-grasses/{id}/restore", [TypeGrassController::class, 'restore'])->name('type-grasses.restore');

        // Informacion de contacto de clientes
        Route::get('/admin/contact', [ContactController::class, 'index'])->name('contacts.index');
        Route::delete('/admin/contact/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');

        // Permisos
        Route::resource('/permissions', PermissionController::class);

        // Roles
        Route::resource('/roles', RoleController::class);

        // Transacciones
        Route::get('/transacciones', [TransactionController::class, 'index'])
            ->name('transactions.index');
    });


    Route::middleware(['auth', 'verified', 'role:comprador'])->group(function () {
        Route::get('/public/profile', [ProfileController::class, 'editPublic'])->name('public.profile.edit');
        Route::patch('/public/profile', [ProfileController::class, 'updatePublic'])->name('public.profile.update');
    });


    // ─────────────────────────────────────────────
    // Rutas para usuario autenticado y que tiene correo verificado
    // ─────────────────────────────────────────────
    Route::middleware(['auth', 'verified'])->group(function () {

        Route::get('/my-orders', [EcommerceSalesController::class, 'showOrderHistory'])
            ->name('orders.history');

        Route::post('/orders/{id}/cancel', [EcommerceSalesController::class, 'cancelOrder'])
            ->name('orders.cancel');

        Route::middleware('role:ganadero')->group(function () {

            // Listado general (todas las fincas del ganadero)
            Route::get('/my-veterinarians', [VeterinarianController::class, 'index'])
                ->name('veterinarians.index');

            // Lotes
            Route::resource('/paddocks', PaddockController::class);
            Route::put("/paddock/{id}/restore", [PaddockController::class, 'restore'])->name('paddock.restore');

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

        // Dashboard
        Route::get("/dashboard", [DashboardController::class, 'index'])->name('dashboard');

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
