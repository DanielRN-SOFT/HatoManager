<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use App\Models\User;
use App\Models\VeterinarianInvitation;
use App\Notifications\VeterinarianInvitationExistingUser;
use App\Notifications\VeterinarianInvitationNewUser;
use App\Notifications\VeterinarianUnlinkedFromFarm;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class VeterinarianController extends Controller
{
    /* ══════════════════════════════════════════════════════════
     |  INDEX — Página "Mis Veterinarios"
     |  Muestra los vets vinculados e invitaciones pendientes
     |  para la finca activa del ganadero autenticado.
     ╚═════════════════════════════════════════════════════════ */
    public function index(): Response
    {
        $ganadero = Auth::user();
        $farmId = session('active_farm_id');

        $query = $ganadero->farms()->with([
            'veterinarios:id,name,email',
            'veterinarianInvitations' => fn($q) => $q
                ->where('status', 'pending')
                ->select('id', 'farm_id', 'email', 'token_expires_at', 'status', 'created_at'),
        ]);

        if ($farmId) {
            $query->where('farms.id', $farmId);
        }

        $farms = $query->get(['farms.id', 'farms.name', 'farms.city', 'farms.department']);

        return Inertia::render('Veterinarios/MisVeterinarios', [
            'farms' => $farms,
        ]);
    }

    /* ══════════════════════════════════════════════════════════
     |  INVITE — HM-AUTH-0040
     |  POST /fincas/{farm}/veterinarios/invitar
     ╚═════════════════════════════════════════════════════════ */
    public function invite(Request $request, Farm $farm): RedirectResponse
    {
        $ganadero = Auth::user();

        // Verificar que el ganadero es dueño/miembro de la finca
        abort_unless(
            $ganadero->farms()->where('farm_id', $farm->id)->exists(),
            403,
            'No tienes acceso a esta finca.'
        );

        $request->validate([
            'email' => 'required|email|lowercase|max:255',
        ]);

        $email = $request->input('email');

        // ── 1. ¿Ya está vinculado a esta finca? ──────────────
        $alreadyLinked = $farm->veterinarios()
            ->where('email', $email)
            ->exists();

        if ($alreadyLinked) {
            return back()->withErrors([
                'email' => 'Este veterinario ya está vinculado a esta finca.',
            ]);
        }

        // ── 2. ¿Hay una invitación pendiente activa? ──────────
        $pendingInvitation = VeterinarianInvitation::where('farm_id', $farm->id)
            ->where('email', $email)
            ->where('status', 'pending')
            ->where(
                fn($q) => $q
                    ->whereNull('token_expires_at')
                    ->orWhere('token_expires_at', '>', now())
            )
            ->first();

        if ($pendingInvitation) {
            return back()->withErrors([
                'email' => 'Ya hay una invitación pendiente para este correo en esta finca.',
            ]);
        }

        // ── 3. Buscar usuario existente ───────────────────────
        $existingUser = User::where('email', $email)->first();

        if ($existingUser) {
            // Tiene cuenta pero con otro rol → rechazar sin revelar datos
            if (! $existingUser->hasRole('veterinario')) {
                return back()->withErrors([
                    'email' => 'No se pudo enviar la invitación. Verifica que el correo corresponda a un veterinario registrado.',
                ]);
            }

            // Veterinario existente → invitación directa sin token
            $invitation = VeterinarianInvitation::create([
                'farm_id'    => $farm->id,
                'invited_by' => $ganadero->id,
                'email'      => $email,
                'status'     => 'pending',
            ]);

            $existingUser->notify(new VeterinarianInvitationExistingUser($farm, $ganadero, $invitation->id));

            return back()->with('success', "Invitación enviada a {$email}. El veterinario recibirá un correo para aceptarla.");
        }

        // ── 4. Sin cuenta → token de 48 horas ─────────────────
        $token = Str::random(64);

        VeterinarianInvitation::create([
            'farm_id'          => $farm->id,
            'invited_by'       => $ganadero->id,
            'email'            => $email,
            'token'            => $token,
            'token_expires_at' => now()->addHours(48),
            'status'           => 'pending',
        ]);

        Notification::route('mail', $email)
            ->notify(new VeterinarianInvitationNewUser($farm, $ganadero, $token));

        return back()->with('success', "Invitación enviada a {$email}. El enlace es válido por 48 horas.");
    }

    /* ══════════════════════════════════════════════════════════
     |  RESPOND — Veterinario acepta o rechaza (usuario existente)
     |  GET /invitaciones/{invitation}/{action}
     ╚═════════════════════════════════════════════════════════ */
    public function respond(VeterinarianInvitation $invitation, string $action): RedirectResponse
    {
        $vet = Auth::user();

        // Solo el veterinario invitado puede responder
        abort_unless($vet->email === $invitation->email, 403);
        abort_unless($invitation->isPending(), 422, 'Esta invitación ya fue procesada.');

        if ($action === 'accept') {
            // Vincular a la finca
            $invitation->farm->users()->syncWithoutDetaching([$vet->id]);
            $invitation->update(['status' => 'accepted']);

            return redirect()->route('dashboard')
                ->with('success', "Ahora estás vinculado a la finca {$invitation->farm->name}.");
        }

        if ($action === 'reject') {
            $invitation->update(['status' => 'rejected']);

            return redirect()->route('dashboard')
                ->with('info', 'Has rechazado la invitación.');
        }

        abort(422, 'Acción inválida.');
    }

    /* ══════════════════════════════════════════════════════════
     |  ACCEPT TOKEN — Nuevo usuario acepta al registrarse
     |  Llamado desde RegisteredUserController después del registro
     ╚═════════════════════════════════════════════════════════ */
    public static function acceptTokenInvitation(User $newUser, string $token): bool
    {
        $invitation = VeterinarianInvitation::where('token', $token)
            ->where('status', 'pending')
            ->where('token_expires_at', '>', now())
            ->first();

        if (! $invitation) {
            return false; // Token inválido o expirado — el registro igual procede
        }

        // Asegurar que el correo coincide
        if ($invitation->email !== $newUser->email) {
            return false;
        }

        // Asignar rol veterinario si no lo tiene
        if (! $newUser->hasRole('veterinario')) {
            $newUser->assignRole('veterinario');
        }

        // Vincular a la finca
        $invitation->farm->users()->syncWithoutDetaching([$newUser->id]);
        $invitation->update(['status' => 'accepted']);
        return true;
    }

    /* ══════════════════════════════════════════════════════════
     |  DELETE /fincas/{farm}/veterinarios/{veterinarian}
     ╚═════════════════════════════════════════════════════════ */
    public function unlink(Farm $farm, User $vet): RedirectResponse
    {
        $ganadero = Auth::user();

        // Verificar que el ganadero pertenece a la finca
        abort_unless(
            $ganadero->farms()->where('farm_id', $farm->id)->exists(),
            403,
            'No tienes acceso a esta finca.'
        );

        // Verificar que el usuario a desvincular es efectivamente un veterinario de esta finca
        abort_unless(
            $farm->veterinarios()->where('user_id', $vet->id)->exists(),
            404,
            'El veterinario no está vinculado a esta finca.'
        );

        // Desvincular — solo de esta finca
        $farm->users()->detach($vet->id);

        // Cancelar invitaciones pendientes de este correo en esta finca
        VeterinarianInvitation::where('farm_id', $farm->id)
            ->where('email', $vet->email)
            ->where('status', 'pending')
            ->update(['status' => 'expired']);

        $vet->notify(new VeterinarianUnlinkedFromFarm($farm));

        return redirect()->route('veterinarians.index')
            ->with('success', "{$vet->name} fue desvinculado de la finca {$farm->name}.");
    }

    /* ══════════════════════════════════════════════════════════
     |  CANCEL INVITATION — Ganadero cancela una invitación pendiente
     |  DELETE /invitaciones/{invitation}/cancelar
     ╚═════════════════════════════════════════════════════════ */


    public function cancelInvitation(VeterinarianInvitation $invitation)
    {
        $ganadero = Auth::user();

        // Solo el ganadero que la creó puede cancelarla
        abort_unless($invitation->invited_by === $ganadero->id, 403);

        // Si ya fue procesada, mostramos una vista dedicada en vez de abortar feo
        if (! $invitation->isPending()) {
            return Inertia::render('Invitations/AlreadyProcessed', [
                'email'  => $invitation->email,
                'status' => $invitation->status,
            ]);
        }

        $invitation->update(['status' => 'expired']);

        return redirect()->route('veterinarians.index')
            ->with('success', "Invitación a {$invitation->email} cancelada.");
    }
}
