import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PieEstado = ({estadoData, renderPieSector}) => {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart
                margin={{
                    top: 16,
                    right: 8,
                    bottom: 16,
                    left: 8,
                }}
            >
                <Pie
                    data={estadoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={34}
                    outerRadius={54}
                    paddingAngle={3}
                    dataKey="value"
                    shape={renderPieSector}
                    label={({ name, percent }) =>
                        percent > 0.07
                            ? `${name} ${(percent * 100).toFixed(0)}%`
                            : null
                    }
                    labelLine={false}
                />
                <Tooltip
                    contentStyle={{
                        fontSize: 11,
                        borderRadius: 8,
                    }}
                    formatter={(v) => [`${v} animales`, '']}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieEstado;
