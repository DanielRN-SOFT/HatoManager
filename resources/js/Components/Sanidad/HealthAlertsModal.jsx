import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';

export default function HealthAlertsModal({ show, alerts, onClose }) {
    if (!show) return null;

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
                            Todas las alertas pendientes ({alerts.length})
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 transition hover:text-gray-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Lista */}
                <div className="flex-1 space-y-2 overflow-y-auto px-6 py-4">
                    {alerts.map((alert) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
}
