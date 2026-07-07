import Modal from '@/Components/Modal';
import formatearDinero from '@/helpers/formatearDinero';
import formatDateTime from '@/helpers/formatearFechaHora';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import InfoItem from './InfoItem';
import Pill from './Pill';

const DetailModal = ({ order, mode, onClose, BIZ_STYLES, PAY_STYLES }) => {
    const [loading, setLoading] = useState(null); // `${animal_order_id}-confirm|reject`

    function act(animalOrderId, action) {
        setLoading(`${animalOrderId}-${action}`);
        router.post(
            `/seller/animal-order/${animalOrderId}/${action}`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setLoading(null),
            },
        );
    }

    const TX_STYLES = {
        aprobada: 'bg-emerald-50 text-emerald-700',
        pendiente: 'bg-amber-50 text-amber-700',
        rechazada: 'bg-red-50 text-red-600',
        expirada: 'bg-gray-100 text-gray-500',
        reembolsada: 'bg-purple-50 text-purple-600',
    };

    const SEX_LABELS = {
        M: { label: 'Macho', cls: 'bg-blue-50 text-blue-700' },
        H: { label: 'Hembra', cls: 'bg-pink-50 text-pink-700' },
    };

    const STATUS_STYLES = {
        Activo: { cls: 'bg-green-50 text-green-700' },
        Inactivo: { cls: 'bg-amber-50 text-amber-700' },
        Muerto: { cls: 'bg-red-50 text-red-600' },
        Reservado: { cls: 'bg-blue-50 text-blue-600' },
        Vendido: { cls: 'bg-purple-50 text-purple-600' },
        Publicado: { cls: 'bg-orange-50 text-orange-600' },
    };
    const isSales = mode === 'ventas';
    return (
        <Modal show={!!order} maxWidth="2xl" closeable={true} onClose={onClose}>
            {order && (
                <>
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isSales ? 'bg-green-100' : 'bg-blue-100'}`}
                            >
                                <span
                                    className={`material-symbols-outlined text-[20px] ${isSales ? 'text-primary' : 'text-blue-600'}`}
                                >
                                    {isSales ? 'storefront' : 'shopping_bag'}
                                </span>
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    {isSales
                                        ? 'Detalle de venta'
                                        : 'Detalle de compra'}
                                </p>
                                <h2 className="font-mono text-sm font-bold text-gray-800">
                                    {order.reference ?? `#${order.id}`}
                                </h2>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
                        >
                            <PiXBold className="text-[16px]" />
                        </button>
                    </div>

                    <div className="max-h-[80vh] space-y-5 overflow-y-auto p-6">
                        {/* Info general */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <InfoItem
                                label="Fecha"
                                value={formatDateTime(order.date)}
                            />
                            <InfoItem
                                label={isSales ? 'Comprador' : 'Vendedor'}
                                value={order.counterpart_name ?? '—'}
                            />
                            <InfoItem
                                label="Total"
                                value={formatearDinero(order.subtotal)}
                                highlight
                            />
                            <InfoItem
                                label="Estado negocio"
                                value={
                                    <Pill
                                        label={order.bussiness_status}
                                        map={BIZ_STYLES}
                                    />
                                }
                            />
                            <InfoItem
                                label="Estado pago"
                                value={
                                    <Pill
                                        label={order.payment_status}
                                        map={PAY_STYLES}
                                    />
                                }
                            />
                            <InfoItem
                                label="Animales"
                                value={`${order.animals_count ?? 0} cabezas`}
                            />
                        </div>

                        {/* Transacción */}
                        {order.transaction && (
                            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Transacción Wompi
                                </p>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                    <InfoItem
                                        label="ID Wompi"
                                        value={
                                            <span className="break-all font-mono text-xs">
                                                {order.transaction.wompi_id}
                                            </span>
                                        }
                                    />
                                    <InfoItem
                                        label="Fecha"
                                        value={formatDateTime(
                                            order.transaction.transaction_date,
                                        )}
                                    />
                                    <InfoItem
                                        label="Monto"
                                        value={formatearDinero(
                                            order.transaction.amount,
                                        )}
                                        highlight
                                    />
                                    <InfoItem
                                        label="Estado"
                                        value={
                                            <Pill
                                                label={
                                                    order.transaction
                                                        .transaction_status
                                                }
                                                map={TX_STYLES}
                                            />
                                        }
                                    />
                                    <InfoItem
                                        label="Tipo"
                                        value={
                                            order.transaction.transaction_type
                                        }
                                    />
                                    <InfoItem
                                        label="Moneda"
                                        value={order.transaction.moneda}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Animales */}
                        {order.animals && order.animals.length > 0 && (
                            <div>
                                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                                    Animales incluidos
                                </p>
                                <div className="space-y-2">
                                    {order.animals.map((a) => {
                                        const isPending =
                                            isSales &&
                                            a.status_order ===
                                                'Pendiente de confirmacion';

                                        return (
                                            <div
                                                key={a.id}
                                                className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                                            >
                                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                                    <InfoItem
                                                        label="Arete"
                                                        value={
                                                            <span className="font-semibold text-primary">
                                                                {a.ear_tag}
                                                            </span>
                                                        }
                                                    />
                                                    <InfoItem
                                                        label="Categoría"
                                                        value={a.category}
                                                    />
                                                    <InfoItem
                                                        label="Raza"
                                                        value={a.breed}
                                                    />
                                                    <InfoItem
                                                        label="Sexo"
                                                        value={
                                                            <span
                                                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${(SEX_LABELS[a.sex] ?? { cls: 'bg-gray-100 text-gray-500' }).cls}`}
                                                            >
                                                                {
                                                                    (
                                                                        SEX_LABELS[
                                                                            a
                                                                                .sex
                                                                        ] ?? {
                                                                            label: a.sex,
                                                                        }
                                                                    ).label
                                                                }
                                                            </span>
                                                        }
                                                    />
                                                    <InfoItem
                                                        label="Estado"
                                                        value={
                                                            <Pill
                                                                label={
                                                                    a.status
                                                                }
                                                                map={
                                                                    STATUS_STYLES
                                                                }
                                                            />
                                                        }
                                                    />
                                                    <InfoItem
                                                        label="Precio"
                                                        value={formatearDinero(
                                                            a.pivot_price,
                                                        )}
                                                        highlight
                                                    />
                                                </div>

                                                {isSales && a.status_order && (
                                                    <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3">
                                                        <span
                                                            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                                                                a.status_order ===
                                                                'Confirmado'
                                                                    ? 'border-green-200 bg-green-50 text-green-700'
                                                                    : a.status_order ===
                                                                        'Rechazado'
                                                                      ? 'border-red-200 bg-red-50 text-red-600'
                                                                      : 'border-amber-200 bg-amber-50 text-amber-700'
                                                            }`}
                                                        >
                                                            {a.status_order}
                                                        </span>

                                                        {isPending && (
                                                            <div className="flex gap-2">
                                                                <button
                                                                    disabled={
                                                                        !!loading
                                                                    }
                                                                    onClick={() =>
                                                                        act(
                                                                            a.animal_order_id,
                                                                            'confirm',
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-on-primary transition-all hover:opacity-90 disabled:opacity-50"
                                                                >
                                                                    <span className="material-symbols-outlined text-[15px]">
                                                                        check_circle
                                                                    </span>
                                                                    {loading ===
                                                                    `${a.animal_order_id}-confirm`
                                                                        ? 'Confirmando...'
                                                                        : 'Confirmar'}
                                                                </button>
                                                                <button
                                                                    disabled={
                                                                        !!loading
                                                                    }
                                                                    onClick={() =>
                                                                        act(
                                                                            a.animal_order_id,
                                                                            'reject',
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-1.5 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-bold text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
                                                                >
                                                                    <span className="material-symbols-outlined text-[15px]">
                                                                        cancel
                                                                    </span>
                                                                    {loading ===
                                                                    `${a.animal_order_id}-reject`
                                                                        ? 'Rechazando...'
                                                                        : 'Rechazar'}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Modal>
    );
};

export default DetailModal;
