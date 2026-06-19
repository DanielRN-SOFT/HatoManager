const TIPO_ICON = {
    Vacuna: 'vaccines',
    Desparasitación: 'pest_control',
    Vitamina: 'nutrition',
    Medicamento: 'medication',
};

const TabSanidad = ({ activeTab, animal, healthRecords, formatDate }) => {
    if (activeTab !== 'salud') return null;

    return (
        <div className="space-y-4">
            {/* Antecedentes médicos */}
            {animal.previous_diseases && (
                <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <span className="material-symbols-outlined mt-0.5 text-amber-600">
                        warning_amber
                    </span>
                    <div>
                        <p className="mb-1 text-sm font-bold text-amber-900">
                            Antecedentes médicos
                        </p>
                        <p className="text-sm leading-relaxed text-amber-800">
                            {animal.previous_diseases}
                        </p>
                    </div>
                </div>
            )}

            {/* Registros de salud */}
            {healthRecords.length > 0 && (
                <div
                    className={
                        healthRecords.length > 6
                            ? 'max-h-[34rem] overflow-y-auto pr-1'
                            : ''
                    }
                >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {healthRecords.map((h) => (
                            <div
                                key={h.id}
                                className="group rounded-2xl border border-outline-variant bg-surface p-4 transition-shadow hover:shadow-sm"
                            >
                                {/* Cabecera */}
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                                            <span className="material-symbols-outlined text-[16px] text-primary">
                                                {TIPO_ICON[h.type] ??
                                                    'health_and_safety'}
                                            </span>
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wide text-primary">
                                            {h.type}
                                        </span>
                                    </div>
                                    <span className="text-xs text-on-surface-variant">
                                        {formatDate(h.applied_at)}
                                    </span>
                                </div>

                                {/* Producto y dosis */}
                                {h.product && (
                                    <p className="text-sm font-semibold text-on-surface">
                                        {h.product}
                                        {h.dose && (
                                            <span className="ml-2 text-xs font-normal text-on-surface-variant">
                                                · {h.dose}
                                            </span>
                                        )}
                                    </p>
                                )}

                                {/* Notas */}
                                {h.notes && (
                                    <p className="mt-1.5 text-sm leading-relaxed text-on-surface-variant">
                                        {h.notes}
                                    </p>
                                )}

                                {/* Próxima aplicación */}
                                {h.next_date && (
                                    <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-surface-container px-3 py-2">
                                        <span className="material-symbols-outlined text-sm text-on-surface-variant">
                                            event_upcoming
                                        </span>
                                        <span className="text-xs text-on-surface-variant">
                                            Próxima aplicación:{' '}
                                            <span className="font-semibold text-on-surface">
                                                {formatDate(h.next_date)}
                                            </span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {healthRecords.length === 0 && !animal.previous_diseases && (
                <div className="flex flex-col items-center gap-2 py-8 text-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-5xl opacity-30">
                        health_and_safety
                    </span>
                    <p className="text-sm">Sin registros sanitarios</p>
                </div>
            )}
        </div>
    );
};

export default TabSanidad;
