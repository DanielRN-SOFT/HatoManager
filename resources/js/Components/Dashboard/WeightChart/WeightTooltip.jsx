const WeightTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-lg">
            <p className="mb-1 text-[11px] font-semibold text-gray-400">
                {label}
            </p>
            {payload.map((p) => (
                <p
                    key={p.dataKey}
                    className="text-sm font-bold"
                    style={{ color: p.color }}
                >
                    {p.name}: {p.value} kg
                </p>
            ))}
        </div>
    );
};
export default WeightTooltip;
