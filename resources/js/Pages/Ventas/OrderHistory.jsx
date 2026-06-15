import EcommerceLayout from '@/Layouts/EcommerceLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const BUSINESS_BADGE = {
    'Pendiente de confirmacion': {
        bg: 'bg-amber-50 border border-amber-200',
        text: 'text-amber-700',
    },
    'Cancelado por comprador': {
        bg: 'bg-red-50 border border-red-200',
        text: 'text-red-600',
    },
    'Rechazado por ganadero': {
        bg: 'bg-red-50 border border-red-200',
        text: 'text-red-600',
    },
    Confirmado: {
        bg: 'bg-blue-50 border border-blue-200',
        text: 'text-blue-700',
    },
    Completado: {
        bg: 'bg-green-50 border border-green-200',
        text: 'text-green-700',
    },
};

const PAYMENT_BADGE = {
    Pendiente: {
        bg: 'bg-amber-50 border border-amber-200',
        text: 'text-amber-700',
    },
    Aprobado: {
        bg: 'bg-green-50 border border-green-200',
        text: 'text-green-700',
    },
    Rechazado: { bg: 'bg-red-50 border border-red-200', text: 'text-red-600' },
    Expirado: {
        bg: 'bg-gray-100 border border-gray-200',
        text: 'text-gray-500',
    },
    Reembolsado: {
        bg: 'bg-purple-50 border border-purple-200',
        text: 'text-purple-700',
    },
};

const ANIMAL_STATUS = {
    'Pendiente de confirmacion': 'text-amber-600',
    Confirmado: 'text-green-600',
    Rechazado: 'text-red-500',
};

function Badge({ label, style }) {
    const s = style ?? {
        bg: 'bg-gray-100 border border-gray-200',
        text: 'text-gray-500',
    };
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${s.bg} ${s.text}`}
        >
            {label}
        </span>
    );
}

function formatCOP(value) {
    return Number(value).toLocaleString('es-CO', { minimumFractionDigits: 2 });
}

function OrderCard({ order }) {
    const [open, setOpen] = useState(false);

    const visibleAnimals = order.animals.slice(0, 3);
    const remainingCount = order.animals.length - visibleAnimals.length;

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
            {/* ── Header ── */}
            <div className="flex flex-col gap-3 px-5 pb-4 pt-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-sm font-bold text-on-surface">
                            Pedido #{order.id}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-[14px]">
                                calendar_today
                            </span>
                            {order.date}
                        </div>
                    </div>
                    {order.reference && (
                        <span className="shrink-0 rounded bg-surface-container px-2 py-0.5 font-mono text-[11px] text-on-surface-variant">
                            {order.reference}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Badge
                        label={order.bussiness_status}
                        style={BUSINESS_BADGE[order.bussiness_status]}
                    />
                    <Badge
                        label={order.payment_status}
                        style={PAYMENT_BADGE[order.payment_status]}
                    />
                </div>
            </div>

            {/* ── Resumen animales ── */}
            <div className="mx-5 mb-4 flex-1 overflow-hidden rounded-xl border border-outline-variant bg-surface-container/40">
                {visibleAnimals.map((animal, idx) => (
                    <div
                        key={animal.id}
                        className={`flex items-center gap-3 px-3 py-2.5 ${idx !== 0 ? 'border-t border-outline-variant' : ''}`}
                    >
                        {/* Imagen */}
                        {animal.image ? (
                            <img
                                src={animal.image}
                                alt={animal.name ?? `Animal #${animal.id}`}
                                className="h-10 w-10 shrink-0 rounded-lg border border-outline-variant object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-outline-variant bg-surface text-on-surface-variant">
                                <span className="material-symbols-outlined text-[20px]">
                                    pets
                                </span>
                            </div>
                        )}

                        {/* Info */}
                        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                            <span className="truncate text-sm font-semibold text-on-surface">
                                {animal.name ?? `Animal #${animal.id}`}
                            </span>
                            {animal.ear_tag && (
                                <span className="truncate font-mono text-xs text-on-surface-variant">
                                    Arete: {animal.ear_tag}
                                </span>
                            )}
                        </div>

                        {/* Estado + precio */}
                        <div className="flex shrink-0 flex-col items-end gap-1">
                            <span
                                className={`text-xs font-medium ${ANIMAL_STATUS[animal.status_order] ?? 'text-on-surface-variant'}`}
                            >
                                {animal.status_order}
                            </span>
                            <span className="font-mono text-sm font-bold text-on-surface">
                                ${formatCOP(animal.snapshot_price)}
                            </span>
                        </div>
                    </div>
                ))}

                {remainingCount > 0 && (
                    <div className="border-t border-outline-variant px-3 py-2 text-center text-xs font-medium text-on-surface-variant">
                        +{remainingCount}{' '}
                        {remainingCount === 1 ? 'animal más' : 'animales más'}
                    </div>
                )}
            </div>

            {/* ── Footer: total + toggle ── */}
            <div className="flex items-center justify-between gap-3 border-t border-outline-variant px-5 py-4">
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
                        ${formatCOP(order.subtotal)} COP
                    </span>
                </div>
            </div>

            {/* ── Detalle transacción (colapsable) ── */}
            {open && order.transaction && (
                <div className="border-t border-outline-variant bg-surface-container/30 px-5 py-4">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Transacción
                    </p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        {[
                            {
                                label: 'Fecha',
                                value: order.transaction.transaction_date,
                                mono: false,
                            },
                            {
                                label: 'Monto',
                                value: `$${formatCOP(order.transaction.amount)} COP`,
                                mono: true,
                            },
                            {
                                label: 'Estado',
                                value: order.transaction.transaction_status,
                                mono: false,
                            },
                            {
                                label: 'Tipo',
                                value: order.transaction.transaction_type.replace(
                                    /_/g,
                                    ' ',
                                ),
                                mono: false,
                            },
                        ].map(({ label, value, mono }) => (
                            <div key={label} className="flex flex-col gap-0.5">
                                <span className="text-xs text-on-surface-variant">
                                    {label}
                                </span>
                                <span
                                    className={`truncate text-sm capitalize text-on-surface ${mono ? 'font-mono' : ''}`}
                                >
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {open && !order.transaction && (
                <div className="border-t border-outline-variant bg-surface-container/30 px-5 py-4 text-sm text-on-surface-variant">
                    Sin transacción registrada.
                </div>
            )}
        </div>
    );
}

export default function OrderHistory({ orders }) {
    return (
        <EcommerceLayout>
            <Head title="Mis Pedidos" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                {/* Page header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-on-surface">
                            Mis pedidos
                        </h1>
                        <p className="mt-0.5 text-sm text-on-surface-variant">
                            Historial completo de tus compras y su estado
                            actual.
                        </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-[22px]">
                            receipt_long
                        </span>
                    </div>
                </div>

                {/* Empty state */}
                {orders.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-outline-variant bg-white py-20 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-container text-on-surface-variant">
                            <span className="material-symbols-outlined text-4xl">
                                receipt_long
                            </span>
                        </div>
                        <p className="text-base font-semibold text-on-surface">
                            No tienes pedidos aún
                        </p>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Cuando realices una compra aparecerá aquí.
                        </p>
                        <Link
                            href="/sales"
                            className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-on-primary no-underline transition-all hover:bg-primary-container"
                        >
                            Ver catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {orders.data.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}

                {/* Paginación */}
                {orders.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-1.5">
                        {orders.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                preserveScroll
                                className={[
                                    'flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-3 text-sm font-medium no-underline transition-colors',
                                    link.active
                                        ? 'bg-primary text-on-primary'
                                        : link.url
                                          ? 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
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
