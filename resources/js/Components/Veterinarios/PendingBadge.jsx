import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function PendingBadge({ invitation }) {
    const [confirming, setConfirming] = useState(false);

    function cancel() {
        router.delete(route('veterinarians.invitation.cancel', invitation.id), {
            preserveState: false,
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
