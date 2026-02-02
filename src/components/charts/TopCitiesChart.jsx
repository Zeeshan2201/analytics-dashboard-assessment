import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

const TopCitiesChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 10, bottom: 60 }}
            >
                <defs>
                    <linearGradient id="cityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={1} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                />
                <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                <Bar
                    dataKey="count"
                    fill="url(#cityGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1200}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default TopCitiesChart;
