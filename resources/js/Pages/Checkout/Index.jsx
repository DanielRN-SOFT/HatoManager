import EcommerceLayout from '@/Layouts/EcommerceLayout';
import formatearDinero from '@/helpers/formatearDinero';
import { Head, router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

export default function CheckoutIndex({
    publicKey,
    reference,
    amountInCents,
    currency,
    signature,
    redirectUrl,
    userEmail,
    userName,
    total,
    itemCount,
}) {
    const btnRef = useRef(null);

    useEffect(() => {
        // Cargar el script del widget de Wompi una sola vez
        if (document.getElementById('wompi-script')) return;
        const script = document.createElement('script');
        script.id = 'wompi-script';
        script.src = 'https://checkout.wompi.co/widget.js';
        script.setAttribute('data-render', 'button');
        document.head.appendChild(script);
    }, []);

    function handlePagar() {
        // Usar la API JS del widget en lugar del botón automático
        // para poder controlar el flujo desde React
        if (window.WidgetCheckout) {
            const checkout = new window.WidgetCheckout({
                currency,
                amountInCents,
                reference,
                publicKey,
                signature: { integrity: signature },
                redirectUrl,
                customerData: {
                    email: userEmail,
                    fullName: userName,
                },
            });
            checkout.open((result) => {
                const tx = result?.transaction;
                if (tx?.id) {
                    // Redirigir manualmente al resultado con el ID de Wompi
                    window.location.href = `/checkout/resultado?id=${tx.id}`;
                }
            });
        }
    }

    return (
        <EcommerceLayout>
            <Head title="Finalizar compra — HatoManager" />
            <main className="mx-auto max-w-[500px] px-4 py-16">
                <div className="rounded-2xl border border-outline-variant bg-surface p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="material-symbols-outlined text-3xl text-primary">
                            payments
                        </span>
                        <div>
                            <h1 className="text-xl font-bold text-on-surface">
                                Resumen de pago
                            </h1>
                            <p className="text-sm text-on-surface-variant">
                                {itemCount}{' '}
                                {itemCount === 1 ? 'animal' : 'animales'}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 rounded-xl bg-surface-container p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-on-surface-variant">
                                Total a pagar
                            </span>
                            <span className="text-2xl font-bold text-primary">
                                {formatearDinero(total)}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-on-surface-variant">
                            Referencia:{' '}
                            <span className="font-mono">{reference}</span>
                        </p>
                    </div>

                    <div className="mb-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
                        <p className="flex items-start gap-2">
                            <span className="material-symbols-outlined mt-0.5 text-[16px] text-primary">
                                info
                            </span>
                            Los animales quedarán en estado{' '}
                            <strong>Reservado</strong> mientras el ganadero
                            confirma tu pedido.
                        </p>
                    </div>

                    <button
                        onClick={handlePagar}
                        className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-on-primary transition-all hover:opacity-90 active:scale-[0.98]"
                    >
                        Pagar con Wompi
                    </button>

                    <button
                        onClick={() => router.visit('/carrito')}
                        className="mt-3 w-full rounded-xl border border-outline-variant py-2.5 text-sm font-medium text-on-surface-variant transition-all hover:bg-surface-container"
                    >
                        Volver al carrito
                    </button>
                </div>
            </main>
        </EcommerceLayout>
    );
}
