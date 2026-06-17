import formatearDinero from '@/helpers/formatearDinero';
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

const VentasMensuales = ({ ventaData, formatAxisCOP }) => {
    const APP_COLORS = {
        primary: '#275300', // theme.colors.primary
        secondaryContainer: '#fffff', // theme.colors['secondary-container']
    };
    return (
        <ResponsiveContainer width="100%" height={220}>
            <BarChart
                data={ventaData}
                barCategoryGap="32%"
                margin={{
                    top: 4,
                    right: 4,
                    left: 12,
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
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={formatAxisCOP}
                />
                <Tooltip
                    contentStyle={{
                        fontSize: 12,
                        borderRadius: 8,
                        border: '1px solid #e5e7eb',
                    }}
                    formatter={(v, name) =>
                        name === 'total'
                            ? [formatearDinero(v), 'Total COP']
                            : [v, 'Órdenes']
                    }
                />
                <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11 }}
                    formatter={(v) => (v === 'total' ? 'Total COP' : 'Órdenes')}
                />
                <Bar
                    dataKey="total"
                    fill={APP_COLORS.primary}
                    radius={[3, 3, 0, 0]}
                    name="total"
                />
                <Bar
                    dataKey="cantidad"
                    fill={APP_COLORS.secondaryContainer}
                    radius={[3, 3, 0, 0]}
                    name="cantidad"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default VentasMensuales;
