export default function FarmCard({ farm, onEdit, onDeactivate, onRestore }) {
    const isActive = !farm.deleted_at;

    return (
        <div
            className={[
                'rounded-xl border-t-4 p-4 shadow-sm transition-all',
                isActive
                    ? 'border-primary bg-white'
                    : 'border-outline-variant/40 bg-surface-container-lowest opacity-60',
            ].join(' ')}
        >
            {/* Header */}
            <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-on-surface">
                        {farm.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                        {farm.city}, {farm.department}
                    </p>
                </div>
                <span
                    className={[
                        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        isActive
                            ? 'bg-primary/10 text-primary'
                            : 'bg-outline-variant/30 text-on-surface-variant',
                    ].join(' ')}
                >
                    {isActive ? 'Activa' : 'Inactiva'}
                </span>
            </div>

            {/* Datos */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        straighten
                    </span>
                    {farm.area} ha
                </span>
                <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                        monitor_weight
                    </span>
                    {farm.target_weight} kg objetivo
                </span>
                <span className="col-span-2 flex items-center gap-1 truncate">
                    <span className="material-symbols-outlined text-[14px]">
                        location_on
                    </span>
                    {farm.address}
                </span>
            </div>

            {/* Acciones */}
            {isActive ? (
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(farm)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-outline-variant px-3 py-1.5 text-xs text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            edit
                        </span>
                        Editar
                    </button>
                    <button
                        onClick={() => onDeactivate(farm)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-error/30 px-3 py-1.5 text-xs text-error transition-colors hover:bg-error/5"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            hide_source
                        </span>
                        Desactivar
                    </button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <button
                        onClick={() => onRestore(farm)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-primary/30 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/5"
                    >
                        <span className="material-symbols-outlined text-[14px]">
                            restore
                        </span>
                        Restaurar
                    </button>
                </div>
            )}
        </div>
    );
}
