import { router } from '@inertiajs/react';
import { PiArrowDownLeftBold, PiArrowUpRightBold } from 'react-icons/pi';

const TabsFiltros = ({ sales, purchases, tab, setTab }) => {
    function handleTabChange(newTab) {
        setTab(newTab);
        router.get(
            route('sales.index'),
            { tab: newTab },
            { preserveState: true, replace: true },
        );
    }

    return (
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
    );
};

export default TabsFiltros;
