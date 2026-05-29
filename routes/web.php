    <?php

    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\SelectFarmController;
    use App\Http\Controllers\VeterinarianController;
    use App\Http\Controllers\FarmController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\TwoFactorController;
    use Inertia\Inertia;

    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    });

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
    });

    // ─────────────────────────────────────────────
    // Rutas para ganadero y veterinario
    // ─────────────────────────────────────────────
    Route::middleware(['auth', 'verified', 'role:ganadero|veterinario'])->group(function () {
        Route::get('/select-farm', [SelectFarmController::class, 'index'])->name('select-farm.index');
        Route::post('/select-farm', [SelectFarmController::class, 'store'])->name('select-farm.store');
        Route::get('/mis-fincas', [FarmController::class, 'index'])->name('farms.index');
        Route::post('/mis-fincas', [FarmController::class, 'store'])->name('farms.store');
        Route::put('/mis-fincas/{farm}', [FarmController::class, 'update'])->name('farms.update');
        Route::delete('/mis-fincas/{farm}', [FarmController::class, 'destroy'])->name('farms.destroy');
        Route::post('/mis-fincas/{farm}/activar', [FarmController::class, 'setActive'])->name('farms.setActive');
        Route::get('/mis-fincas/list', [FarmController::class, 'list'])->name('farms.list');
    });

    require __DIR__ . '/auth.php';
