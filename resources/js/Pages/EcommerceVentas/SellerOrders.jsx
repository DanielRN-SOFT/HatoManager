import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

function formatCOP(v) {
    return Number(v).toLocaleString('es-CO', { minimumFractionDigits: 2 });
}

const STATUS_STYLE = {
    'Pendiente de confirmacion': 'bg-amber-50 border-amber-200 text-amber-700',
    Confirmado: 'bg-green-50 border-green-200 text-green-700',
    Rechazado: 'bg-red-50 border-red-200 text-red-600',
};

export default function SellerOrders({ items }) {
    const { flash } = usePage().props;
    const [loading, setLoading] = useState(null); // animal_order_id en proceso

    function act(id, action) {
        setLoading(`${id}-${action}`);
        router.post(
            `/seller/animal-order/${id}/${action}`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setLoading(null),
            },
        );
    }

    const rows = items?.data ?? [];

    return (
        <EcommerceLayout>
            <Head title="Pedidos recibidos — HatoManager" />
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-on-surface">
                            Pedidos recibidos
                        </h1>
                        <p className="mt-0.5 text-sm text-on-surface-variant">
                            Confirma o rechaza cada animal de tus pedidos.
                        </p>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-primary">
                        inventory
                    </span>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                        {flash.error}
                    </div>
                )}

                {rows.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-outline-variant bg-white py-20 text-center">
                        <span className="material-symbols-outlined text-5xl text-outline">
                            inbox
                        </span>
                        <p className="mt-4 text-base font-semibold text-on-surface">
                            Sin pedidos aún
                        </p>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Cuando un comprador adquiera tus animales,
                            aparecerán aquí.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {rows.map((row) => {
                            const isPending =
                                row.status_order ===
                                'Pendiente de confirmacion';
                            const statusClass =
                                STATUS_STYLE[row.status_order] ??
                                'bg-gray-100 border-gray-200 text-gray-500';

                            return (
                                <div
                                    key={row.animal_order_id}
                                    className="flex flex-col gap-4 rounded-2xl border border-outline-variant bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                                >
                                    {/* Imagen */}
                                    {row.animal.image ? (
                                        <img
                                            src={row.animal.image}
                                            alt={row.animal.name}
                                            className="h-16 w-16 shrink-0 rounded-xl border border-outline-variant object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-outline-variant bg-surface-container text-on-surface-variant">
                                            <span className="material-symbols-outlined text-3xl">
                                                pets
                                            </span>
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="flex flex-1 flex-col gap-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-semibold text-on-surface">
                                                {row.animal.name}
                                            </span>
                                            {row.animal.ear_tag && (
                                                <span className="font-mono text-xs text-on-surface-variant">
                                                    Arete: {row.animal.ear_tag}
                                                </span>
                                            )}
                                            <span
                                                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClass}`}
                                            >
                                                {row.status_order}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-on-surface-variant">
                                            <span>
                                                Pedido #{row.order.id} ·{' '}
                                                {row.order.date}
                                            </span>
                                            <span>
                                                Comprador: {row.order.comprador}
                                            </span>
                                            <span>
                                                Ref:{' '}
                                                <span className="font-mono">
                                                    {row.order.reference}
                                                </span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Precio + acciones */}
                                    <div className="flex shrink-0 flex-col items-end gap-2">
                                        <span className="font-mono text-base font-bold text-on-surface">
                                            ${formatCOP(row.snapshot_price)} COP
                                        </span>

                                        {isPending && (
                                            <div className="flex gap-2">
                                                <button
                                                    disabled={!!loading}
                                                    onClick={() =>
                                                        act(
                                                            row.animal_order_id,
                                                            'confirm',
                                                        )
                                                    }
                                                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-on-primary transition-all hover:opacity-90 disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined text-[15px]">
                                                        check_circle
                                                    </span>
                                                    {loading ===
                                                    `${row.animal_order_id}-confirm`
                                                        ? 'Confirmando...'
                                                        : 'Confirmar'}
                                                </button>
                                                <button
                                                    disabled={!!loading}
                                                    onClick={() =>
                                                        act(
                                                            row.animal_order_id,
                                                            'reject',
                                                        )
                                                    }
                                                    className="flex items-center gap-1.5 rounded-lg border border-error px-3 py-1.5 text-xs font-bold text-error transition-all hover:bg-error-container disabled:opacity-50"
                                                >
                                                    <span className="material-symbols-outlined text-[15px]">
                                                        cancel
                                                    </span>
                                                    {loading ===
                                                    `${row.animal_order_id}-reject`
                                                        ? 'Rechazando...'
                                                        : 'Rechazar'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Paginación */}
                {items?.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-1.5">
                        {items.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() =>
                                    link.url &&
                                    router.visit(link.url, {
                                        preserveScroll: false,
                                    })
                                }
                                className={[
                                    'flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors',
                                    link.active
                                        ? 'bg-primary text-on-primary'
                                        : link.url
                                          ? 'text-on-surface-variant hover:bg-surface-container'
                                          : 'pointer-events-none text-on-surface-variant/30',
                                ].join(' ')}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </EcommerceLayout>
    );
}
