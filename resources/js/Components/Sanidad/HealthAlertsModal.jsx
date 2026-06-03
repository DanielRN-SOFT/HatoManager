import Modal from '@/Components/Modal';
import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';
import { useState } from 'react';

export default function HealthAlertsModal({ show, alerts, onClose }) {
    const [tab, setTab] = useState('proximas');

    const today = new Date();
    const proximas = alerts.filter((a) => new Date(a.alert_date) >= today);
    const vencidas = alerts.filter((a) => new Date(a.alert_date) < today);
    const current = tab === 'proximas' ? proximas : vencidas;

    return (
        <Modal show={show} maxWidth="2xl" onClose={onClose}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100">
                        <span className="material-symbols-outlined text-[18px] text-orange-500">
                            notifications_active
                        </span>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-on-surface">
                            Alertas pendientes
                        </h2>
                        <p className="text-xs text-on-surface-variant">
                            {alerts.length} alerta
                            {alerts.length !== 1 ? 's' : ''} en total
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="rounded-lg p-1.5 text-on-surface-variant transition-colors hover:bg-surface-container"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 px-6">
                <button
                    onClick={() => setTab('proximas')}
                    className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                        tab === 'proximas'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Próximas ({proximas.length})
                </button>
                <button
                    onClick={() => setTab('vencidas')}
                    className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
                        tab === 'vencidas'
                            ? 'border-error text-error'
                            : 'border-transparent text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    Vencidas ({vencidas.length})
                </button>
            </div>

            {/* Lista */}
            <div className="max-h-[55vh] space-y-2 overflow-y-auto px-6 py-4">
                {current.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 py-10 text-on-surface-variant">
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
                                <span className="min-w-[120px] text-sm text-on-surface-variant">
                                    {alert.animal?.ear_tag}
                                    {alert.animal?.name
                                        ? ` — ${alert.animal.name}`
                                        : ''}
                                </span>
                                <HealthTypeBadge type={alert.type} />
                                <span className="text-sm text-on-surface">
                                    {alert.health_record?.product ?? '—'}
                                </span>
                            </div>
                            <AlertBadge nextDate={alert.alert_date} />
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
}
