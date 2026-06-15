const TabPeso = ({ activeTab, weightRecords, formatDate }) => {
    const latestWeight = weightRecords[0];
    const firstWeight = weightRecords[weightRecords.length - 1];
    const weightGain =
        latestWeight && firstWeight && latestWeight.id !== firstWeight.id
            ? Number(latestWeight.weight) - Number(firstWeight.weight)
            : null;

    return (
        <>
            {activeTab === 'peso' && (
                <div>
                    {weightGain !== null && (
                        <div className="mb-3 flex justify-end">
                            <span
                                className={`flex items-center gap-1 text-sm font-bold ${
                                    weightGain >= 0
                                        ? 'text-primary'
                                        : 'text-on-surface-variant'
                                }`}
                            >
                                <span className="material-symbols-outlined text-base">
                                    {weightGain >= 0
                                        ? 'trending_up'
                                        : 'trending_down'}
                                </span>
                                {weightGain >= 0 ? '+' : ''}
                                {weightGain} kg desde el primer registro
                            </span>
                        </div>
                    )}
                    <div className="overflow-hidden rounded-2xl border border-outline-variant">
                        <div
                            className={
                                weightRecords.length > 5
                                    ? 'max-h-[18rem] overflow-y-auto'
                                    : ''
                            }
                        >
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 z-10 bg-surface-container-highest text-xs uppercase tracking-wider text-on-surface-variant">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-bold">
                                            Fecha
                                        </th>
                                        <th className="px-4 py-3 text-right font-bold">
                                            Peso
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weightRecords.map((w, i) => (
                                        <tr
                                            key={w.id}
                                            className={
                                                i % 2 === 0
                                                    ? 'bg-surface'
                                                    : 'bg-surface-container'
                                            }
                                        >
                                            <td className="px-4 py-3 text-on-surface-variant">
                                                {formatDate(w.weight_date)}
                                            </td>
                                            <td className="px-4 py-3 text-right font-semibold text-on-surface">
                                                {w.weight} kg
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TabPeso;
