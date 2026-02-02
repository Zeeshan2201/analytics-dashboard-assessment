import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#a855f7'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">{data.fullName}</p>
                <p className="custom-tooltip__value">
                    {data.value.toLocaleString()} vehicles
                    ({((data.value / (payload[0].payload.total || data.value)) * 100).toFixed(1)}%)
                </p>
            </div>
        );
    }
    return null;
};

const EVTypeChart = ({ data }) => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const dataWithTotal = data.map(d => ({ ...d, total }));

    return (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={dataWithTotal}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                >
                    {dataWithTotal.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke="transparent"
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) => (
                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                            {value} - {entry.payload.value.toLocaleString()}
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default EVTypeChart;
