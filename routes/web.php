    <?php

    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\SelectFarmController;
    use App\Http\Controllers\VeterinarianController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;

    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    require __DIR__ . '/auth.php';
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
    Route::middleware(['auth', 'verified', 'role:ganadaro|veterinario'])->group(function () {
        Route::get('/select-farm', [SelectFarmController::class, 'index'])->name('farm.select');
        Route::post('/select-farm', [SelectFarmController::class, 'store'])->name('farm.select.store');
    });

    require __DIR__ . '/auth.php';
