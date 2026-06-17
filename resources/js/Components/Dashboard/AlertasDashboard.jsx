import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const COLS = ['Arete', 'Animal', 'Tipo', 'Producto', 'Fecha', 'Estado', ''];

const TABS = [
    {
        key: 'vencidas',
        label: 'Vencidas',
        icono: 'emergency',
        colorActivo: 'border-red-300 bg-red-50 text-red-600',
        colorBadge: 'bg-red-100 text-red-700',
    },
    {
        key: 'proximas',
        label: 'Próximas (7 días)',
        icono: 'schedule',
        colorActivo: 'border-yellow-300 bg-yellow-50 text-yellow-600',
        colorBadge: 'bg-yellow-100 text-yellow-700',
    },
];

function Paginacion({ data, tab }) {
    const { current_page, last_page } = data;
    if (last_page <= 1) return null;

    function goTo(page) {
        router.get(
            route('dashboard'),
            { tab, page },
            { preserveState: true, replace: true },
        );
    }

    const pages = Array.from({ length: last_page }, (_, i) => i + 1)
        .filter(
            (p) =>
                p === 1 || p === last_page || Math.abs(p - current_page) <= 1,
        )
        .reduce((acc, p, i, arr) => {
            if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
            acc.push(p);
            return acc;
        }, []);

    return (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            <span className="text-xs text-gray-500">
                Página {current_page} de {last_page}
            </span>
            <div className="flex gap-1">
                <button
                    onClick={() => goTo(current_page - 1)}
                    disabled={current_page === 1}
                    className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                >
                    &laquo;
                </button>
                {pages.map((p, i) =>
                    p === '...' ? (
                        <span
                            key={`d-${i}`}
                            className="px-1 text-xs text-gray-400"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            onClick={() => goTo(p)}
                            className={`rounded px-3 py-1 text-xs transition ${
                                p === current_page
                                    ? 'bg-primary text-white'
                                    : 'text-gray-500 hover:bg-gray-100'
                            }`}
                        >
                            {p}
                        </button>
                    ),
                )}
                <button
                    onClick={() => goTo(current_page + 1)}
                    disabled={current_page === last_page}
                    className="rounded px-3 py-1 text-xs text-gray-500 transition hover:bg-gray-100 disabled:opacity-40"
                >
                    &raquo;
                </button>
            </div>
        </div>
    );
}

export default function AlertasDashboard({
    alertas,
    totales,
    tab: initialTab,
}) {
    const [tab, setTab] = useState(initialTab ?? 'vencidas');
    const total = (totales?.vencidas ?? 0) + (totales?.proximas ?? 0);
    const items = alertas?.data ?? [];

    if (total === 0) return null;

    function handleTabChange(newTab) {
        setTab(newTab);
        router.get(
            route('dashboard'),
            { tab: newTab },
            { preserveState: true, replace: true },
        );
    }

    return (
        <div className="mb-6 flex flex-col gap-4">
            {/* Card filtros */}
            <div className="rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span
                            className="material-symbols-outlined text-orange-500"
                            style={{ fontSize: 22 }}
                        >
                            notifications_active
                        </span>
                        <h2 className="text-base font-semibold text-gray-800">
                            Alertas activas
                        </h2>
                        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">
                            {total}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {TABS.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => handleTabChange(t.key)}
                                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                                    tab === t.key
                                        ? t.colorActivo
                                        : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
                                }`}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: 15 }}
                                >
                                    {t.icono}
                                </span>
                                {t.label}
                                <span
                                    className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${t.colorBadge}`}
                                >
                                    {totales?.[t.key] ?? 0}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="overflow-hidden rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary text-xs font-semibold uppercase tracking-wide text-white">
                                {COLS.map((h) => (
                                    <th key={h} className="px-4 py-3">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {items.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="py-16 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-3 text-gray-400">
                                            <span className="material-symbols-outlined text-5xl">
                                                check_circle
                                            </span>
                                            <p className="text-sm">
                                                No hay alertas en esta
                                                categoría.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-100 transition hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm font-semibold text-primary">
                                            {item.ear_tag}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {item.nombre ?? '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <HealthTypeBadge type={item.tipo} />
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {item.producto}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {new Date(
                                                item.next_date + 'T00:00:00',
                                            ).toLocaleDateString('es-CO')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <AlertBadge
                                                nextDate={item.next_date}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() =>
                                                    router.visit(
                                                        `/animals/${item.animal_id}`,
                                                    )
                                                }
                                                className="text-gray-400 transition hover:text-primary"
                                                title="Ver animal"
                                            >
                                                <span
                                                    className="material-symbols-outlined"
                                                    style={{ fontSize: '20px' }}
                                                >
                                                    open_in_new
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <Paginacion
                    data={alertas ?? { current_page: 1, last_page: 1 }}
                    tab={tab}
                />
            </div>
        </div>
    );
}
