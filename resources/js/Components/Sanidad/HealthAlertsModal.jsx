import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';
import { useState } from 'react';

export default function HealthAlertsModal({ show, alerts, onClose }) {
    const [tab, setTab] = useState('proximas');

    if (!show) return null;

    const today = new Date();
    const proximas = alerts.filter((a) => new Date(a.alert_date) >= today);
    const vencidas = alerts.filter((a) => new Date(a.alert_date) < today);
    const current = tab === 'proximas' ? proximas : vencidas;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative mx-4 flex max-h-[80vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-orange-500">
                            notifications_active
                        </span>
                        <h2 className="text-base font-semibold text-gray-800">
                            Alertas pendientes ({alerts.length})
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition hover:text-gray-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100 px-6">
                    <button
                        onClick={() => setTab('proximas')}
                        className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                            tab === 'proximas'
                                ? 'border-green-600 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Próximas ({proximas.length})
                    </button>
                    <button
                        onClick={() => setTab('vencidas')}
                        className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                            tab === 'vencidas'
                                ? 'border-red-500 text-red-500'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Vencidas ({vencidas.length})
                    </button>
                </div>

                {/* Lista */}
                <div className="flex-1 space-y-2 overflow-y-auto px-6 py-4">
                    {current.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
                            <span className="material-symbols-outlined text-4xl">
                                check_circle
                            </span>
                            <p className="text-sm">
                                No hay alertas en esta categoría.
                            </p>
                        </div>
                    ) : (
                        current.map((alert) => (
                            <div
                                key={alert.id}
                                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-2.5"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="min-w-[120px] text-sm text-gray-600">
                                        {alert.animal?.ear_tag}
                                        {alert.animal?.name
                                            ? ` — ${alert.animal.name}`
                                            : ''}
                                    </span>
                                    <HealthTypeBadge type={alert.type} />
                                    <span className="text-sm text-gray-700">
                                        {alert.health_record?.product ?? '—'}
                                    </span>
                                </div>
                                <AlertBadge nextDate={alert.alert_date} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
