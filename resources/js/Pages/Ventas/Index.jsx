import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MdPendingActions } from 'react-icons/md';
import {
    PiArrowDownLeftBold,
    PiArrowUpRightBold,
    PiCowFill,
} from 'react-icons/pi';

/* ── helpers ───────────────────────────────────────────── */
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

/* ── badge ─────────────────────────────────────────────── */
const BADGE = {
    'Pendiente de confirmacion': 'bg-amber-100 text-amber-800',
    Confirmado: 'bg-blue-100 text-blue-800',
    Completado: 'bg-emerald-100 text-emerald-800',
    'Cancelado por comprador': 'bg-red-100 text-red-700',
    'Rechazado por ganadero': 'bg-red-100 text-red-700',
    Pendiente: 'bg-amber-100 text-amber-800',
    Aprobado: 'bg-emerald-100 text-emerald-800',
    Rechazado: 'bg-red-100 text-red-700',
    Expirado: 'bg-gray-100 text-gray-500',
    Reembolsado: 'bg-purple-100 text-purple-700',
};
function Badge({ label }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${BADGE[label] ?? 'bg-gray-100 text-gray-600'}`}
        >
            {label}
        </span>
    );
}

/* ── stat card ─────────────────────────────────────────── */
function StatCard({ icon, label, value, sub, color }) {
    return (
        <div className="flex items-start gap-4 rounded-2xl border border-outline-variant bg-surface p-5 shadow-sm">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[22px] ${color}`}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                    {label}
                </p>
                <p className="mt-0.5 truncate text-2xl font-bold text-on-surface">
                    {value}
                </p>
                {sub && (
                    <p className="mt-0.5 text-xs text-on-surface-variant">
                        {sub}
                    </p>
                )}
            </div>
        </div>
    );
}

/* ── orders table ──────────────────────────────────────── */
function OrdersTable({ orders, mode }) {
    const isSales = mode === 'ventas';

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-on-surface-variant">
                {isSales ? (
                    <PiArrowUpRightBold className="text-5xl opacity-20" />
                ) : (
                    <PiArrowDownLeftBold className="text-5xl opacity-20" />
                )}
                <p className="text-sm">
                    {isSales
                        ? 'Aún no tienes ventas registradas.'
                        : 'Aún no tienes compras registradas.'}
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-outline-variant bg-surface-container-low text-left text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                        <th className="px-5 py-3">Referencia</th>
                        <th className="px-5 py-3">Fecha</th>
                        <th className="px-5 py-3">
                            {isSales ? 'Comprador' : 'Vendedor'}
                        </th>
                        <th className="px-5 py-3">Animales</th>
                        <th className="px-5 py-3">Total</th>
                        <th className="px-5 py-3">Negocio</th>
                        <th className="px-5 py-3">Pago</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                    {orders.map((order) => (
                        <tr
                            key={order.id}
                            className="transition-colors hover:bg-surface-container-low"
                        >
                            <td className="px-5 py-3 font-mono text-xs text-on-surface-variant">
                                {order.reference ?? `#${order.id}`}
                            </td>
                            <td className="px-5 py-3 text-on-surface">
                                {formatDate(order.date)}
                            </td>
                            <td className="px-5 py-3 text-on-surface">
                                {order.counterpart_name ?? '—'}
                            </td>
                            <td className="px-5 py-3">
                                <span className="flex items-center gap-1.5 text-on-surface">
                                    <PiCowFill className="text-[14px] text-on-surface-variant" />
                                    {order.animals_count ?? 0}
                                </span>
                            </td>
                            <td className="px-5 py-3 font-semibold text-primary">
                                {formatCOP(order.subtotal)}
                            </td>
                            <td className="px-5 py-3">
                                <Badge label={order.bussiness_status} />
                            </td>
                            <td className="px-5 py-3">
                                <Badge label={order.payment_status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════
 |  Page
 ╚═════════════════════════════════════════════════════════ */
export default function SalesIndex() {
    const { sales = [], purchases = [], stats = {} } = usePage().props;
    const [tab, setTab] = useState('ventas');

    const activeOrders = tab === 'ventas' ? sales : purchases;

    return (
        <AuthenticatedLayout>
            <Head title="Mis Transacciones" />

            {/* ── Header ── */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-on-surface">
                    Mis Transacciones
                </h1>
                <p className="mt-0.5 text-sm text-on-surface-variant">
                    Panel privado — ventas de tu ganado y compras realizadas
                </p>
            </div>

            {/* ── Stats ── */}
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
                    color="bg-primary/10 text-primary"
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

            {/* ── Tabs + Table ── */}
            <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface shadow-sm">
                {/* Tab bar */}
                <div className="flex items-center gap-1 border-b border-outline-variant px-4 pt-3">
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
                            onClick={() => setTab(key)}
                            className={[
                                'flex items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors',
                                tab === key
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface',
                            ].join(' ')}
                        >
                            <span className="text-[16px]">{icon}</span>
                            {label}
                            <span
                                className={[
                                    'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                                    tab === key
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-surface-container text-on-surface-variant',
                                ].join(' ')}
                            >
                                {count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Table */}
                <OrdersTable orders={activeOrders} mode={tab} />
            </div>
        </AuthenticatedLayout>
    );
}
