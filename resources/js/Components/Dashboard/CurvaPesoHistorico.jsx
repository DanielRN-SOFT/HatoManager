import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import WeightTooltip from './WeightChart/WeightTooltip';

const CurvaPesoHistorico = ({pesoData}) => {
    return (
        <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={pesoData}
                    margin={{
                        top: 8,
                        right: 8,
                        bottom: 0,
                        left: -4,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(0,0,0,0.05)"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="mes"
                        tick={{
                            fontSize: 10,
                            fill: '#9ca3af',
                        }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        tick={{
                            fontSize: 10,
                            fill: '#9ca3af',
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `${v} kg`}
                        width={52}
                    />
                    <Tooltip content={<WeightTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="peso"
                        name="Peso"
                        stroke="rgb(34,107,66)"
                        strokeWidth={2.5}
                        dot={{
                            r: 4,
                            fill: 'rgb(34,107,66)',
                            strokeWidth: 0,
                        }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CurvaPesoHistorico;
