import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function VetRow({ vet, farm }) {
    const [confirming, setConfirming] = useState(false);

    function unlink() {
        console.log('unlink ejecutado', farm.id, vet.id);
        router.delete(
            route('veterinarians.unlink', {
                farm: farm.id,
                veterinarian: vet.id,
            }),
            {
                preserveState: false,
                onSuccess: () => setConfirming(false),
            },
        );
    }

    return (
        <div className="flex items-center justify-between py-3">
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
                        type="button"
                        onClick={unlink}
                        className="text-xs font-semibold text-error hover:underline"
                    >
                        Sí, desvincular
                    </button>
                    <button
                        type="button"
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
