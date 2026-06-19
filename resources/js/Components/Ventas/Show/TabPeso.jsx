import formatearDinero from "@/helpers/formatearDinero";

const TabPeso = ({ activeTab, weightRecords, formatDate }) => {
    const latestWeight = weightRecords[0];
    const firstWeight = weightRecords[weightRecords.length - 1];
    const weightGain =
        latestWeight && firstWeight && latestWeight.id !== firstWeight.id
            ? Number(latestWeight.weight) - Number(firstWeight.weight)
            : null;

    if (activeTab !== 'peso') return null;

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
            {/* Columna de resumen */}
            <div className="space-y-4">
                {latestWeight && (
                    <div className="bg-primary/8 rounded-2xl border border-primary/15 px-5 py-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-xl text-primary">
                                monitor_weight
                            </span>
                            <span className="text-sm font-medium text-on-surface">
                                Peso actual
                            </span>
                        </div>
                        <span className="mt-2 block text-3xl font-bold text-primary">
                            {latestWeight.weight} kg
                        </span>
                    </div>
                )}

                {weightGain !== null && (
                    <div
                        className={`rounded-2xl px-5 py-4 ${
                            weightGain >= 0
                                ? 'border border-emerald-100 bg-emerald-50'
                                : 'border border-outline-variant bg-surface-container'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={`material-symbols-outlined text-xl ${
                                    weightGain >= 0
                                        ? 'text-emerald-600'
                                        : 'text-on-surface-variant'
                                }`}
                            >
                                {weightGain >= 0
                                    ? 'trending_up'
                                    : 'trending_down'}
                            </span>
                            <span className="text-sm text-on-surface-variant">
                                Ganancia total
                            </span>
                        </div>
                        <span
                            className={`mt-2 block text-3xl font-bold ${
                                weightGain >= 0
                                    ? 'text-emerald-700'
                                    : 'text-on-surface-variant'
                            }`}
                        >
                            {weightGain >= 0 ? '+' : ''}
                            {formatearDinero(weightGain)} kg
                        </span>
                    </div>
                )}
            </div>

            {/* Tabla de registros */}
            <div className="overflow-hidden rounded-2xl border border-outline-variant">
                <div
                    className={
                        weightRecords.length > 8
                            ? 'max-h-[28rem] overflow-y-auto'
                            : ''
                    }
                >
                    <table className="w-full text-sm">
                        <thead className="sticky top-0 z-10 border-b border-outline-variant bg-surface-container-highest">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                                    Fecha
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                                    Peso
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/50">
                            {weightRecords.map((w, i) => (
                                <tr
                                    key={w.id}
                                    className={`transition-colors hover:bg-surface-container/60 ${
                                        i === 0 ? 'font-medium' : ''
                                    }`}
                                >
                                    <td className="px-4 py-3 text-on-surface-variant">
                                        {formatDate(w.weight_date)}
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold text-on-surface">
                                        {w.weight} kg
                                        {i === 0 && (
                                            <span className="ml-2 inline-block rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                                                actual
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TabPeso;
