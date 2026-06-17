import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const IngresosSalidas = ({ movData }) => {
    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart
                data={movData}
                barCategoryGap="32%"
                margin={{
                    top: 4,
                    right: 4,
                    left: -12,
                    bottom: 0,
                }}
            >
                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                />
                <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                />
                <Tooltip
                    contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                    }}
                    formatter={(v, name) => [
                        v,
                        name === 'ingresos' ? 'Ingresos' : 'Salidas',
                    ]}
                />
                <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11 }}
                    formatter={(v) =>
                        v === 'ingresos' ? 'Ingresos' : 'Salidas'
                    }
                />
                <Bar
                    dataKey="ingresos"
                    fill="#16a34a"
                    radius={[3, 3, 0, 0]}
                    name="ingresos"
                />
                <Bar
                    dataKey="salidas"
                    fill="#dc2626"
                    radius={[3, 3, 0, 0]}
                    name="salidas"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default IngresosSalidas;
