import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
    '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63',
    '#1e3a5f', '#1e40af', '#1d4ed8'
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">{payload[0].payload.name}</p>
                <p className="custom-tooltip__value">
                    {payload[0].value.toLocaleString()} vehicles served
                </p>
            </div>
        );
    }
    return null;
};

const UtilityChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
                <XAxis
                    type="number"
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                    stroke="#64748b"
                    fontSize={12}
                />
                <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={10}
                    width={115}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }} />
                <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    animationDuration={1200}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default UtilityChart;
