import Modal from '@/Components/Modal';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MdPendingActions } from 'react-icons/md';
import {
    PiArrowDownLeftBold,
    PiArrowUpRightBold,
    PiCowFill,
    PiXBold,
} from 'react-icons/pi';

function formatCOP(v) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(v ?? 0);
}
function formatDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatDateTime(d) {
    if (!d) return '—';
    return new Date(d).toLocaleString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

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

const BIZ_STYLES = {
    'Pendiente de confirmacion': 'bg-amber-50 text-amber-700',
    Confirmado: 'bg-blue-50 text-blue-700',
    Completado: 'bg-emerald-50 text-emerald-700',
    'Cancelado por comprador': 'bg-red-50 text-red-600',
    'Rechazado por ganadero': 'bg-red-50 text-red-600',
};

const PAY_STYLES = {
    Pendiente: 'bg-amber-50 text-amber-700',
    Aprobado: 'bg-emerald-50 text-emerald-700',
    Rechazado: 'bg-red-50 text-red-600',
    Expirado: 'bg-gray-100 text-gray-500',
    Reembolsado: 'bg-purple-50 text-purple-600',
};

const TX_STYLES = {
    aprobada: 'bg-emerald-50 text-emerald-700',
    pendiente: 'bg-amber-50 text-amber-700',
    rechazada: 'bg-red-50 text-red-600',
    expirada: 'bg-gray-100 text-gray-500',
    reembolsada: 'bg-purple-50 text-purple-600',
};

function Pill({ label, map }) {
    const cls = (map ?? {})[label] ?? 'bg-gray-100 text-gray-600';
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${cls}`}
        >
            {label}
        </span>
    );
}

function StatCard({ icon, label, value, sub, color }) {
    return (
        <div className="flex items-start gap-4 rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white p-5 shadow-sm">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[22px] ${color}`}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                    {label}
                </p>
                <p className="mt-0.5 truncate text-2xl font-bold text-gray-800">
                    {value}
                </p>
                {sub && <p className="mt-0.5 text-xs text-gray-400">{sub}</p>}
            </div>
        </div>
    );
}

function InfoItem({ label, value, highlight }) {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>
            <p
                className={`mt-0.5 text-sm ${highlight ? 'font-bold text-secondary' : 'text-gray-800'}`}
            >
                {value}
            </p>
        </div>
    );
}

function DetailModal({ order, mode, onClose }) {
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
                                value={formatDate(order.date)}
                            />
                            <InfoItem
                                label={isSales ? 'Comprador' : 'Vendedor'}
                                value={order.counterpart_name ?? '—'}
                            />
                            <InfoItem
                                label="Total"
                                value={formatCOP(order.subtotal)}
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
                                        value={formatCOP(
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
                                    {order.animals.map((a) => (
                                        <div
                                            key={a.id}
                                            className="grid grid-cols-2 gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-3"
                                        >
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
                                                                    a.sex
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
                                                        label={a.status}
                                                        map={STATUS_STYLES}
                                                    />
                                                }
                                            />
                                            <InfoItem
                                                label="Precio"
                                                value={formatCOP(a.pivot_price)}
                                                highlight
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </Modal>
    );
}

function OrdersTable({ orders, mode, onDetail, onPageChange }) {
    const isSales = mode === 'ventas';
    const rows = orders?.data ?? [];
    const { current_page, last_page } = orders ?? {};

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                            <th className="px-4 py-3">Referencia</th>
                            <th className="px-4 py-3">Fecha</th>
                            <th className="px-4 py-3">
                                {isSales ? 'Comprador' : 'Vendedor'}
                            </th>
                            <th className="px-4 py-3">Animales</th>
                            <th className="px-4 py-3">Total</th>
                            <th className="px-4 py-3">Estado negocio</th>
                            <th className="px-4 py-3">Estado pago</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="py-16 text-center">
                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                        <span className="material-symbols-outlined text-5xl">
                                            receipt_long
                                        </span>
                                        <p className="text-sm">
                                            {isSales
                                                ? 'Aún no tienes ventas registradas.'
                                                : 'Aún no tienes compras registradas.'}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((order) => (
                                <tr
                                    key={order.id}
                                    className="cursor-pointer border-b border-gray-100 transition hover:bg-gray-50"
                                    onClick={() => onDetail(order)}
                                >
                                    <td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
                                        {order.reference ?? `#${order.id}`}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {formatDate(order.date)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-800">
                                        {order.counterpart_name ?? '—'}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {order.animals_count} cab.
                                    </td>
                                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                                        {formatCOP(order.subtotal)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Pill
                                            label={order.bussiness_status}
                                            map={BIZ_STYLES}
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <Pill
                                            label={order.payment_status}
                                            map={PAY_STYLES}
                                        />
                                    </td>
                                    <td className="px-4 py-3 text-gray-400">
                                        <span
                                            className="material-symbols-outlined"
                                            style={{ fontSize: 18 }}
                                        >
                                            chevron_right
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {last_page > 1 && (
                <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                    <span className="text-xs text-gray-500">
                        Página {current_page} de {last_page}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onPageChange(current_page - 1)}
                            disabled={current_page === 1}
                            className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                        >
                            &laquo;
                        </button>
                        {Array.from({ length: last_page }, (_, i) => i + 1)
                            .filter(
                                (p) =>
                                    p === 1 ||
                                    p === last_page ||
                                    Math.abs(p - current_page) <= 1,
                            )
                            .reduce((acc, p, i, arr) => {
                                if (i > 0 && p - arr[i - 1] > 1)
                                    acc.push('...');
                                acc.push(p);
                                return acc;
                            }, [])
                            .map((p, i) =>
                                p === '...' ? (
                                    <span
                                        key={`dots-${i}`}
                                        className="px-1 text-xs text-gray-400"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => onPageChange(p)}
                                        className={`rounded px-3 py-1 text-xs transition ${p === current_page ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                                    >
                                        {p}
                                    </button>
                                ),
                            )}
                        <button
                            onClick={() => onPageChange(current_page + 1)}
                            disabled={current_page === last_page}
                            className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                        >
                            &raquo;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function SalesIndex() {
    const {
        sales,
        purchases,
        stats = {},
        tab: initialTab = 'ventas',
    } = usePage().props;
    const [tab, setTab] = useState(initialTab);
    const [detail, setDetail] = useState(null);

    const activeOrders = tab === 'ventas' ? sales : purchases;

    function handleTabChange(newTab) {
        setTab(newTab);
        router.get(
            route('sales.index'),
            { tab: newTab },
            { preserveState: true, replace: true },
        );
    }

    function handlePageChange(page) {
        const pageKey = tab === 'ventas' ? 'sales_page' : 'purchases_page';
        router.get(
            route('sales.index'),
            { tab, [pageKey]: page },
            { preserveState: true, replace: true },
        );
    }
    return (
        <AuthenticatedLayout>
            <Head title="Mis Transacciones" />

            <DetailModal
                order={detail}
                mode={tab}
                onClose={() => setDetail(null)}
            />

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-800">
                    Mis Transacciones
                </h1>
                <p className="mt-0.5 text-sm text-gray-400">
                    Panel privado — ventas de tu ganado y compras realizadas
                </p>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard
                    icon={<PiArrowUpRightBold />}
                    label="Total en ventas"
                    value={formatCOP(stats.total_sales_amount)}
                    sub={`${stats.total_sales} ventas`}
                    color="bg-emerald-100 text-emerald-700"
                />
                <StatCard
                    icon={<PiArrowDownLeftBold />}
                    label="Total en compras"
                    value={formatCOP(stats.total_purchases_amount)}
                    sub={`${stats.total_purchases} compras`}
                    color="bg-blue-100 text-blue-700"
                />
                <StatCard
                    icon={<MdPendingActions />}
                    label="Pendientes"
                    value={stats.pending ?? 0}
                    sub="Entre ventas y compras"
                    color="bg-amber-100 text-amber-700"
                />
                <StatCard
                    icon={<PiCowFill />}
                    label="Animales transados"
                    value={stats.total_animals ?? 0}
                    sub="En todas las órdenes"
                    color="bg-red-100 text-red-700"
                />
            </div>

            {/* Card de tabs/filtros */}
            <div className="mb-4 rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="material-symbols-outlined text-gray-500"
                            style={{ fontSize: 20 }}
                        >
                            receipt_long
                        </span>
                        <h2 className="text-sm font-semibold text-gray-800">
                            Historial de transacciones
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        {[
                            {
                                key: 'ventas',
                                label: 'Mis ventas',
                                icon: <PiArrowUpRightBold />,
                                count: sales.length,
                            },
                            {
                                key: 'compras',
                                label: 'Mis compras',
                                icon: <PiArrowDownLeftBold />,
                                count: purchases.length,
                            },
                        ].map(({ key, label, icon, count }) => (
                            <button
                                key={key}
                                onClick={() => handleTabChange(key)}
                                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                                    tab === key
                                        ? key === 'ventas'
                                            ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                            : 'border-blue-300 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                                }`}
                            >
                                <span className="text-[15px]">{icon}</span>
                                {label}
                                <span
                                    className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                                        tab === key
                                            ? key === 'ventas'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-400'
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white">
                <OrdersTable
                    orders={activeOrders}
                    mode={tab}
                    onDetail={setDetail}
                    onPageChange={handlePageChange}
                />
            </div>
        </AuthenticatedLayout>
    );
}
