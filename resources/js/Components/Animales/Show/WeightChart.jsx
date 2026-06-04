import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
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

const WeightChart = ({ records, targetWeight, fmt }) => {
    if (!records?.length) {
        return (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-400">
                <span className="material-symbols-outlined text-4xl">
                    monitor_weight
                </span>
                <p className="text-sm">Sin registros de peso aún</p>
            </div>
        );
    }

    const data = [...records]
        .sort((a, b) => new Date(a.weight_date) - new Date(b.weight_date))
        .map((r) => ({
            fecha: fmt(r.weight_date),
            peso: parseFloat(r.weight),
        }));

    return (
        <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(0,0,0,0.05)"
                    />
                    <XAxis
                        dataKey="fecha"
                        tick={{ fontSize: 10, fill: '#9ca3af' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 10, fill: '#9ca3af' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${v} kg`}
                        width={56}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {targetWeight && (
                        <ReferenceLine
                            y={parseFloat(targetWeight)}
                            stroke="rgba(251,146,60,0.8)"
                            strokeDasharray="6 4"
                            strokeWidth={2}
                            label={{
                                value: `Objetivo ${targetWeight} kg`,
                                position: 'insideTopRight',
                                fontSize: 10,
                                fill: '#f97316',
                            }}
                        />
                    )}
                    <Line
                        type="monotone"
                        dataKey="peso"
                        name="Peso"
                        stroke="rgb(34,107,66)"
                        strokeWidth={2.5}
                        dot={{ r: 5, fill: 'rgb(34,107,66)', strokeWidth: 0 }}
                        activeDot={{ r: 7 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WeightChart;
