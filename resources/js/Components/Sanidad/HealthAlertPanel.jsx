import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';
import { useState } from 'react';

export default function HealthAlertPanel({
    alerts,
    allAlerts,
    alertsTotal,
    onVerTodas,
}) {
    const [tab, setTab] = useState('proximas');

    if (!alerts || alerts.length === 0) return null;

    const today = new Date();
    const proximas = allAlerts
        .filter((a) => new Date(a.alert_date) >= today)
        .slice(0, 10);

    const vencidas = allAlerts
        .filter((a) => new Date(a.alert_date) < today)
        .sort((a, b) => new Date(a.alert_date) - new Date(b.alert_date))
        .slice(0, 10);
    const current =
        tab === 'proximas' ? proximas.slice(0, 10) : vencidas.slice(0, 10);

    return (
        <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50">
            {/* Header con tabs */}
            <div className="flex items-center justify-between px-4 pb-0 pt-3">
                <div className="flex items-center gap-2">
                    <span
                        className="material-symbols-outlined text-orange-500"
                        style={{ fontSize: '20px' }}
                    >
                        notifications_active
                    </span>
                    <span className="text-sm font-semibold text-orange-700">
                        Alertas pendientes ({alertsTotal})
                    </span>
                </div>
                {alertsTotal > 10 && (
                    <button
                        onClick={onVerTodas}
                        className="text-xs font-medium text-orange-600 transition hover:text-orange-800"
                    >
                        Ver todas ({alertsTotal}) →
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-4 pt-2">
                <button
                    onClick={() => setTab('proximas')}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        tab === 'proximas'
                            ? 'bg-green-100 text-green-700'
                            : 'text-orange-600 hover:bg-orange-100'
                    }`}
                >
                    Próximas ({proximas.length})
                </button>
                <button
                    onClick={() => setTab('vencidas')}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        tab === 'vencidas'
                            ? 'bg-red-100 text-red-700'
                            : 'text-orange-600 hover:bg-orange-100'
                    }`}
                >
                    Vencidas ({vencidas.length})
                </button>
                <span className="text-xs italic text-orange-400">
                    {tab === 'proximas'
                        ? 'Mostrando las 10 más próximas'
                        : 'Mostrando las 10 más antiguas'}
                </span>
            </div>

            {/* Alertas */}
            <div className="flex flex-wrap gap-2 px-4 py-3">
                {current.length === 0 ? (
                    <p className="py-1 text-xs text-orange-500">
                        No hay alertas en esta categoría.
                    </p>
                ) : (
                    current.map((alert) => (
                        <div
                            key={alert.id}
                            className="flex items-center gap-2 rounded-lg border border-orange-200 bg-white px-3 py-1.5 text-xs shadow-sm"
                        >
                            <span className="text-gray-500">
                                {alert.animal?.ear_tag}
                                {alert.animal?.name
                                    ? ` — ${alert.animal.name}`
                                    : ''}
                            </span>
                            <HealthTypeBadge type={alert.type} />
                            <span className="text-gray-700">
                                {alert.health_record?.product ?? '—'}
                            </span>
                            <AlertBadge nextDate={alert.alert_date} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
