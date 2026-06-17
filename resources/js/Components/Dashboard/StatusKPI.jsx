const StatusKPI = ({ kpis }) => {
    const STATUS_CFG = {
        Activo: { color: '#16a34a', bg: 'bg-green-50', text: 'text-green-700' },
        Publicado: {
            color: '#f97316',
            bg: 'bg-orange-50',
            text: 'text-orange-700',
        },
        Reservado: {
            color: '#3b82f6',
            bg: 'bg-blue-50',
            text: 'text-blue-700',
        },
        Vendido: {
            color: '#9333ea',
            bg: 'bg-purple-50',
            text: 'text-purple-700',
        },
        Inactivo: {
            color: '#f59e0b',
            bg: 'bg-amber-50',
            text: 'text-amber-700',
        },
        Muerto: { color: '#ef4444', bg: 'bg-red-50', text: 'text-red-600' },
    };
    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {[
                {
                    key: 'activos',
                    icon: 'check_circle',
                    label: 'Activos',
                    val: kpis.activos ?? 0,
                    cfg: STATUS_CFG.Activo,
                },
                {
                    key: 'publicados',
                    icon: 'storefront',
                    label: 'Publicados',
                    val: kpis.publicados ?? 0,
                    cfg: STATUS_CFG.Publicado,
                },
                {
                    key: 'reservados',
                    icon: 'bookmark',
                    label: 'Reservados',
                    val: kpis.reservados ?? 0,
                    cfg: STATUS_CFG.Reservado,
                },
                {
                    key: 'vendidos',
                    icon: 'sell',
                    label: 'Vendidos',
                    val: kpis.vendidos ?? 0,
                    cfg: STATUS_CFG.Vendido,
                },
                {
                    key: 'inactivos',
                    icon: 'pause_circle',
                    label: 'Inactivos',
                    val: kpis.inactivos ?? 0,
                    cfg: STATUS_CFG.Inactivo,
                },
                {
                    key: 'muertos',
                    icon: 'sentiment_very_dissatisfied',
                    label: 'Muertos',
                    val: kpis.muertos ?? 0,
                    cfg: STATUS_CFG.Muerto,
                },
            ].map(({ key, icon, label, val, cfg }) => (
                <div
                    key={key}
                    className={`flex flex-col items-center justify-center gap-0.5 rounded-xl border border-gray-100 py-4 text-center shadow-md ${cfg.bg}`}
                >
                    <span
                        className={`material-symbols-outlined text-[20px] ${cfg.text}`}
                    >
                        {icon}
                    </span>
                    <span className={`text-2xl font-bold ${cfg.text}`}>
                        {val}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default StatusKPI;
