import DetailModal from '@/Components/Ventas/AdminDashboard/DetailModal';
import OrdersTable from '@/Components/Ventas/AdminDashboard/OrdersTable';
import StatCard from '@/Components/Ventas/AdminDashboard/StatCard';
import TabsFiltros from '@/Components/Ventas/AdminDashboard/TabsFiltros';
import formatearDinero from '@/helpers/formatearDinero';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { MdPendingActions } from 'react-icons/md';
import {
    PiArrowDownLeftBold,
    PiArrowUpRightBold,
    PiCowFill,
} from 'react-icons/pi';

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

const SalesIndex = () => {
    const {
        sales,
        purchases,
        stats = {},
        tab: initialTab = 'ventas',
    } = usePage().props;
    const [tab, setTab] = useState(initialTab);
    const [detail, setDetail] = useState(null);

    const activeOrders = tab === 'ventas' ? sales : purchases;

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
                BIZ_STYLES={BIZ_STYLES}
                PAY_STYLES={PAY_STYLES}
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
            <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-4">
                <StatCard
                    icon={<PiArrowUpRightBold />}
                    label="Total en ventas"
                    value={formatearDinero(stats.total_sales_amount)}
                    sub={`${stats.total_sales} ventas`}
                    color="bg-emerald-100 text-emerald-700"
                />
                <StatCard
                    icon={<PiArrowDownLeftBold />}
                    label="Total en compras"
                    value={formatearDinero(stats.total_purchases_amount)}
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
                    label="Animales negociados"
                    value={stats.total_animals ?? 0}
                    sub="En todas las órdenes"
                    color="bg-red-100 text-red-700"
                />
            </div>

            {/* Card de tabs/filtros */}
            <div className="mb-4 rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white px-6 py-4">
               <TabsFiltros setTab={setTab} tab={tab} sales={sales} purchases={purchases}/>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white">
                <OrdersTable
                    orders={activeOrders}
                    mode={tab}
                    onDetail={setDetail}
                    onPageChange={handlePageChange}
                    BIZ_STYLES={BIZ_STYLES}
                    PAY_STYLES={PAY_STYLES}
                />
            </div>
        </AuthenticatedLayout>
    );
}

export default SalesIndex;
