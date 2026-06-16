import formatearDinero from '@/helpers/formatearDinero';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const FooterCard = ({ setOpen, open, order }) => {
    const [cancelling, setCancelling] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const canCancel = order.bussiness_status === 'Pendiente de pago';

    function handleCancel() {
        if (!confirm) {
            setConfirm(true);
            return;
        }
        setCancelling(true);
        router.post(
            `/orders/${order.id}/cancel`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setCancelling(false);
                    setConfirm(false);
                },
            },
        );
    }

    return (
        <div className="flex flex-col gap-2 border-t border-outline-variant px-5 py-4">
            <div className="flex items-center justify-between gap-3">
                <button
                    onClick={() => setOpen((v) => !v)}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                    <span
                        className="material-symbols-outlined text-[18px] transition-transform"
                        style={{ transform: open ? 'rotate(180deg)' : 'none' }}
                    >
                        expand_more
                    </span>
                    {open ? 'Ocultar' : 'Detalle'}
                </button>

                <div className="flex flex-col items-end">
                    <span className="text-[11px] text-on-surface-variant">
                        Total
                    </span>
                    <span className="font-mono text-base font-bold text-on-surface">
                        {formatearDinero(order.subtotal)} COP
                    </span>
                </div>
            </div>

            {canCancel && (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-red-100 bg-red-50 px-3 py-2">
                    <span className="text-xs text-red-600">
                        {confirm
                            ? '¿Confirmas la cancelación? Los animales volverán al catálogo.'
                            : 'Puedes cancelar este pedido antes de pagar.'}
                    </span>
                    <div className="flex shrink-0 gap-1.5">
                        {confirm && (
                            <button
                                onClick={() => setConfirm(false)}
                                disabled={cancelling}
                                className="rounded-lg border border-outline-variant px-2.5 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container disabled:opacity-50"
                            >
                                No
                            </button>
                        )}
                        <button
                            onClick={handleCancel}
                            disabled={cancelling}
                            className="flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1 text-xs font-bold text-white transition-all hover:bg-red-700 disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[13px]">
                                cancel
                            </span>
                            {cancelling
                                ? 'Cancelando...'
                                : confirm
                                  ? 'Sí, cancelar'
                                  : 'Cancelar pedido'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FooterCard;
