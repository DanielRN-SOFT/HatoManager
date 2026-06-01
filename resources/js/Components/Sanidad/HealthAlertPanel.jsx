import AlertBadge from '@/Components/Sanidad/AlertBadge';
import HealthTypeBadge from '@/Components/Sanidad/HealthTypeBadge';

export default function HealthAlertPanel({ alerts, alertsTotal, onVerTodas }) {
    if (!alerts || alerts.length === 0) return null;

    return (
        <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
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
            <div className="flex flex-wrap gap-2">
                {alerts.map((alert) => (
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
                ))}
            </div>
        </div>
    );
}
