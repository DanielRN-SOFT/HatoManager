// resources/js/Pages/Veterinarians/MisVeterinarians.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────── helpers ─────────────────────────── */
function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (flash?.success || flash?.info) {
            setVisible(true);
            const t = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(t);
        }
    }, [flash]);

    if (!visible || (!flash?.success && !flash?.info)) return null;

    const isSuccess = !!flash.success;

    return (
        <div
            className={[
                'mb-6 flex items-start gap-3 rounded-xl border px-4 py-3',
                isSuccess
                    ? 'bg-primary/8 border-primary/30 text-primary'
                    : 'bg-tertiary/8 border-tertiary/30 text-tertiary',
            ].join(' ')}
        >
            <span className="material-symbols-outlined mt-0.5 shrink-0 text-[20px]">
                {isSuccess ? 'check_circle' : 'info'}
            </span>
            <p className="text-sm font-medium">{flash.success ?? flash.info}</p>
        </div>
    );
}

/* ─── Formulario de invitación por finca ─────────────────────── */
function InviteForm({ farm }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    function submit(e) {
        e.preventDefault();
        post(route('veterinarians.invite', farm.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('email');
                setOpen(false);
            },
        });
    }

    return (
        <div className="mt-4">
            {!open ? (
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-2.5 text-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        person_add
                    </span>
                    Invitar veterinario
                </button>
            ) : (
                <form
                    onSubmit={submit}
                    className="rounded-xl border border-outline-variant bg-surface-container-low p-4"
                >
                    <p className="mb-3 text-sm font-medium text-on-surface">
                        Invitar veterinario a{' '}
                        <span className="text-primary">{farm.name}</span>
                    </p>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <input
                                ref={inputRef}
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="correo@veterinario.com"
                                className={[
                                    'w-full rounded-lg border bg-surface px-3 py-2 text-sm text-on-surface',
                                    'placeholder:text-on-surface-variant/60',
                                    'focus:outline-none focus:ring-2 focus:ring-primary/30',
                                    errors.email
                                        ? 'border-error focus:ring-error/20'
                                        : 'border-outline-variant',
                                ].join(' ')}
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-error">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity disabled:opacity-60"
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                send
                            </span>
                            {processing ? 'Enviando…' : 'Enviar'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                reset('email');
                            }}
                            className="rounded-lg border border-outline-variant px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                close
                            </span>
                        </button>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">
                            info
                        </span>
                        Si el correo no tiene cuenta, recibirá un enlace de
                        registro válido por 48 horas.
                    </p>
                </form>
            )}
        </div>
    );
}

/* ─── Chip de estado para invitaciones pendientes ────────────── */
function PendingBadge({ invitation }) {
    const [confirming, setConfirming] = useState(false);

    function cancel() {
        router.delete(route('veterinarians.invitation.cancel', invitation.id), {
            preserveScroll: true,
            onSuccess: () => setConfirming(false),
        });
    }

    const expiresAt = invitation.token_expires_at
        ? new Date(invitation.token_expires_at)
        : null;

    const isExpired = expiresAt && expiresAt < new Date();

    return (
        <div className="flex items-center justify-between rounded-lg border border-dashed border-outline-variant bg-surface-container-low px-3 py-2.5">
            <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    schedule
                </span>
                <div>
                    <p className="text-sm text-on-surface">
                        {invitation.email}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                        {isExpired ? (
                            <span className="text-error">
                                Invitación expirada
                            </span>
                        ) : expiresAt ? (
                            <>Expira {expiresAt.toLocaleDateString('es-CO')}</>
                        ) : (
                            'Pendiente de aceptación'
                        )}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="bg-tertiary/12 rounded-full px-2.5 py-0.5 text-xs font-medium text-tertiary">
                    Pendiente
                </span>

                {!confirming ? (
                    <button
                        onClick={() => setConfirming(true)}
                        className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container hover:text-error"
                        title="Cancelar invitación"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            cancel
                        </span>
                    </button>
                ) : (
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-on-surface-variant">
                            ¿Cancelar?
                        </span>
                        <button
                            onClick={cancel}
                            className="rounded-lg px-2 py-1 text-xs font-medium text-error transition-colors hover:bg-error-container/40"
                        >
                            Sí
                        </button>
                        <button
                            onClick={() => setConfirming(false)}
                            className="rounded-lg px-2 py-1 text-xs text-on-surface-variant transition-colors hover:bg-surface-container"
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Fila de veterinario vinculado ──────────────────────────── */
function VetRow({ vet, farm }) {
    const [confirming, setConfirming] = useState(false);

    function unlink() {
        router.delete(
            route('veterinarians.unlink', {
                farm: farm.id,
                veterinarian: vet.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => setConfirming(false),
            },
        );
    }

    return (
        <div className="flex items-center justify-between py-3">
            {/* Avatar + datos */}
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                        medical_services
                    </span>
                </div>
                <div>
                    <p className="text-sm font-medium text-on-surface">
                        {vet.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                        {vet.email}
                    </p>
                </div>
            </div>

            {/* Acciones */}
            {!confirming ? (
                <button
                    onClick={() => setConfirming(true)}
                    className="flex items-center gap-1.5 rounded-lg border border-outline-variant px-3 py-1.5 text-xs font-medium text-on-surface-variant transition-colors hover:border-error hover:text-error"
                >
                    <span className="material-symbols-outlined text-[14px]">
                        link_off
                    </span>
                    Desvincular
                </button>
            ) : (
                <div className="flex items-center gap-2 rounded-lg border border-error/40 bg-error-container/20 px-3 py-1.5">
                    <span className="text-xs text-error">¿Confirmar?</span>
                    <button
                        onClick={unlink}
                        className="text-xs font-semibold text-error hover:underline"
                    >
                        Sí, desvincular
                    </button>
                    <button
                        onClick={() => setConfirming(false)}
                        className="text-xs text-on-surface-variant hover:underline"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}

/* ─── Card por finca ─────────────────────────────────────────── */
function FarmCard({ farm }) {
    const hasVets = (farm.veterinarios?.length ?? 0) > 0;
    const hasPending = (farm.veterinarian_invitations?.length ?? 0) > 0;

    return (
        <div className="rounded-2xl border border-outline-variant bg-surface p-5 shadow-sm">
            {/* Header */}
            <div className="mb-1 flex items-start justify-between">
                <div>
                    <h3 className="font-semibold text-on-surface">
                        {farm.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-on-surface-variant">
                        {farm.city}, {farm.department}
                    </p>
                </div>
                <span className="material-symbols-outlined text-[22px] text-on-surface-variant">
                    agriculture
                </span>
            </div>

            <hr className="my-3 border-outline-variant" />

            {/* Veterinarios vinculados */}
            {hasVets ? (
                <div className="divide-y divide-outline-variant">
                    {farm.veterinarians.map((vet) => (
                        <VetRow key={vet.id} vet={vet} farm={farm} />
                    ))}
                </div>
            ) : (
                <p className="py-2 text-sm text-on-surface-variant">
                    Sin veterinarios vinculados aún.
                </p>
            )}

            {/* Invitaciones pendientes */}
            {hasPending && (
                <div className="mt-3 space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
                        Invitaciones pendientes
                    </p>
                    {farm.veterinarian_invitations.map((inv) => (
                        <PendingBadge key={inv.id} invitation={inv} />
                    ))}
                </div>
            )}

            {/* Formulario invitar */}
            <InviteForm farm={farm} />
        </div>
    );
}

/* ─── Page principal ─────────────────────────────────────────── */
export default function MisVeterinarians({ farms }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mis Veterinarios" />

            <div className="mx-auto max-w-3xl">
                {/* Encabezado */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-on-surface">
                        Mis Veterinarios
                    </h1>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        Gestiona qué veterinarios tienen acceso al estado
                        sanitario de tus fincas.
                    </p>
                </div>

                <Flash />

                {/* Sin fincas */}
                {farms.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-low px-6 py-12 text-center">
                        <span className="material-symbols-outlined mb-3 text-[40px] text-on-surface-variant">
                            agriculture
                        </span>
                        <p className="font-medium text-on-surface">
                            Sin fincas registradas
                        </p>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Primero debes registrar una finca para poder invitar
                            veterinarios.
                        </p>
                    </div>
                )}

                {/* Cards por finca */}
                <div className="space-y-4">
                    {farms.map((farm) => (
                        <FarmCard key={farm.id} farm={farm} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
