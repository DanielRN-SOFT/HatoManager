const StatusKPI = ({ kpis }) => {
    const STATUS_CFG = {
        Activo: {
            bg: 'bg-green-50',
            border: 'border-green-100',
            text: 'text-green-700',
            num: 'text-green-800',
        },
        Publicado: {
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            text: 'text-orange-700',
            num: 'text-orange-800',
        },
        Reservado: {
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            text: 'text-blue-700',
            num: 'text-blue-800',
        },
        Vendido: {
            bg: 'bg-purple-50',
            border: 'border-purple-100',
            text: 'text-purple-700',
            num: 'text-purple-800',
        },
        Inactivo: {
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            text: 'text-amber-700',
            num: 'text-amber-800',
        },
        Muerto: {
            bg: 'bg-red-50',
            border: 'border-red-100',
            text: 'text-red-600',
            num: 'text-red-700',
        },
    };

    const items = [
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
    ];

    return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {items.map(({ key, icon, label, val, cfg }) => (
                <div
                    key={key}
                    className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-3 py-4 text-center transition-all duration-150 hover:brightness-95 ${cfg.bg} ${cfg.border}`}
                >
                    <span
                        className={`material-symbols-outlined text-[20px] ${cfg.text}`}
                    >
                        {icon}
                    </span>
                    <span
                        className={`text-2xl font-bold leading-none ${cfg.num}`}
                    >
                        {val}
                    </span>
                    <span
                        className={`text-[10px] font-semibold uppercase tracking-wide ${cfg.text} opacity-75`}
                    >
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default StatusKPI;
