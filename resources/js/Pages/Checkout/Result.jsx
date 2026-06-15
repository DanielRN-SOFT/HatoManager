import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, router } from '@inertiajs/react';

const CONFIG = {
    approved: {
        icon: 'check_circle',
        color: 'text-green-600',
        bg: 'bg-green-50 border-green-200',
        title: '¡Pago exitoso!',
        message:
            'Tu pedido fue creado. El ganadero recibirá una notificación y confirmará cada animal.',
    },
    pending: {
        icon: 'schedule',
        color: 'text-yellow-600',
        bg: 'bg-yellow-50 border-yellow-200',
        title: 'Pago en proceso',
        message:
            'Tu pago está siendo procesado. Te notificaremos cuando sea confirmado.',
    },
    declined: {
        icon: 'cancel',
        color: 'text-error',
        bg: 'bg-error-container/30 border-error/30',
        title: 'Pago rechazado',
        message: 'Tu pago fue rechazado. Intenta con otro método de pago.',
    },
    error: {
        icon: 'error',
        color: 'text-error',
        bg: 'bg-error-container/30 border-error/30',
        title: 'Error en el pago',
        message:
            'Ocurrió un error al procesar tu pago. Contacta a soporte si el problema persiste.',
    },
};

export default function CheckoutResult({ status, reference, orderId }) {
    const cfg = CONFIG[status] ?? CONFIG.error;

    return (
        <EcommerceLayout>
            <Head title="Resultado del pago — HatoManager" />
            <main className="mx-auto max-w-[480px] px-4 py-20">
                <div className={`rounded-2xl border p-8 text-center ${cfg.bg}`}>
                    <span
                        className={`material-symbols-outlined text-6xl ${cfg.color}`}
                    >
                        {cfg.icon}
                    </span>
                    <h1 className="mt-4 text-xl font-bold text-on-surface">
                        {cfg.title}
                    </h1>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        {cfg.message}
                    </p>

                    {reference && (
                        <p className="mt-4 text-xs text-on-surface-variant">
                            Referencia:{' '}
                            <span className="font-mono font-semibold">
                                {reference}
                            </span>
                        </p>
                    )}

                    <div className="mt-8 flex flex-col gap-3">
                        {orderId && (
                            <button
                                onClick={() => router.visit('/my-orders')}
                                className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-on-primary"
                            >
                                Ver mis pedidos
                            </button>
                        )}
                        <button
                            onClick={() => router.visit('/sales')}
                            className="w-full rounded-xl border border-outline-variant py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container"
                        >
                            Seguir comprando
                        </button>
                    </div>
                </div>
            </main>
        </EcommerceLayout>
    );
}
