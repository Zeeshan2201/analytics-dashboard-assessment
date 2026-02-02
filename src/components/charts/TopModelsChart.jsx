import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
    '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6'
];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">{payload[0].payload.name}</p>
                <p className="custom-tooltip__value">
                    {payload[0].value.toLocaleString()} vehicles
                </p>
            </div>
        );
    }
    return null;
};

const TopModelsChart = ({ data }) => {
    // Shorten long model names
    const formattedData = data.map(d => ({
        ...d,
        shortName: d.name.length > 20 ? d.name.substring(0, 20) + '...' : d.name
    }));

    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart
                data={formattedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
                <XAxis
                    type="number"
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                    stroke="#64748b"
                    fontSize={12}
                />
                <YAxis
                    type="category"
                    dataKey="shortName"
                    stroke="#64748b"
                    fontSize={11}
                    width={95}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }} />
                <Bar
                    dataKey="count"
                    radius={[0, 4, 4, 0]}
                    animationDuration={1200}
                >
                    {formattedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopModelsChart;
