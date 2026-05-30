// resources/js/Components/Ganado/HatoStatCards.jsx

export default function HatoStatCards({ stats }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-primary p-6 text-on-primary shadow-md">
                <div className="relative z-10">
                    <p className="text-label-md mb-1 opacity-80">
                        Total Biomasa
                    </p>
                    <h3 className="text-headline-lg font-bold">
                        {Number(stats.total_biomasa).toLocaleString('es-CO')} kg
                    </h3>
                </div>
                <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[80px] opacity-10">
                    monitor_weight
                </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
                <div>
                    <p className="text-label-md mb-1 text-on-surface-variant">
                        Nacimientos este mes
                    </p>
                    <h3 className="text-headline-lg font-bold text-primary">
                        {stats.nacimientos_mes}
                    </h3>
                    <p className="text-body-sm mt-1 flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-[14px]">
                            trending_up
                        </span>
                        +{stats.nacimientos_crecimiento}% vs mes anterior
                    </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed-dim/30 text-primary">
                    <span className="material-symbols-outlined text-[32px]">
                        child_care
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-outline-variant bg-white p-6 shadow-sm">
                <div>
                    <p className="text-label-md mb-1 text-on-surface-variant">
                        Tareas pendientes
                    </p>
                    <h3 className="text-headline-lg font-bold text-error">
                        {stats.tareas_pendientes}
                    </h3>
                    <p className="text-body-sm mt-1 text-on-surface-variant">
                        Requieren atención hoy
                    </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error-container/30 text-error">
                    <span className="material-symbols-outlined text-[32px]">
                        assignment_late
                    </span>
                </div>
            </div>
        </div>
    );
}
