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
        colorActivo: 'border-red-500 text-red-600',
        colorBadge: 'bg-red-100 text-red-700',
    },
    {
        key: 'proximas',
        label: 'Próximas (7 días)',
        icono: 'schedule',
        colorActivo: 'border-yellow-500 text-yellow-600',
        colorBadge: 'bg-yellow-100 text-yellow-700',
    },
];

export default function AlertasDashboard({ alertas }) {
    const { vencidas = [], proximas = [] } = alertas ?? {};
    const total = vencidas.length + proximas.length;
    const [tab, setTab] = useState('vencidas');

    if (total === 0) return null;

    const conteos = { vencidas: vencidas.length, proximas: proximas.length };
    const items = tab === 'vencidas' ? vencidas : proximas;

    return (
        <div className="mb-6 flex flex-col gap-4">
            {/* ── Card de filtros/tabs ── */}
            <div className="rounded-xl border border-t-4 border-gray-200 border-t-secondary bg-white px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Título */}
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

                    {/* Tabs como botones de filtro */}
                    <div className="flex gap-2">
                        {TABS.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setTab(t.key)}
                                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                                    tab === t.key
                                        ? t.key === 'vencidas'
                                            ? 'border-red-300 bg-red-50 text-red-600'
                                            : 'border-yellow-300 bg-yellow-50 text-yellow-600'
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
                                    {conteos[t.key]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Tabla ── */}
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
                                items.slice(0, 10).map((item) => (
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

                {/* Footer */}
                {conteos[tab] > 10 && (
                    <div className="border-t border-gray-100 px-6 py-3 text-center">
                        <span className="text-xs text-gray-400">
                            Mostrando 10 de {conteos[tab]} — ve a Sanidad para
                            ver todas
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
