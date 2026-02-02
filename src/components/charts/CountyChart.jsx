import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
    '#a855f7', '#ec4899', '#6366f1', '#14b8a6', '#f97316',
    '#3b82f6', '#22d3ee', '#10b981', '#f59e0b', '#ef4444'
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">{payload[0].payload.name} County</p>
                <p className="custom-tooltip__value">
                    {payload[0].value.toLocaleString()} vehicles
                </p>
            </div>
        );
    }
    return null;
};

const CountyChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
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
                    fontSize={12}
                    width={75}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }} />
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

export default CountyChart;
