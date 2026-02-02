import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">{payload[0].payload.range} miles</p>
                <p className="custom-tooltip__value">
                    {payload[0].value.toLocaleString()} vehicles
                </p>
            </div>
        );
    }
    return null;
};

const RangeChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart
                data={data}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
                <defs>
                    <linearGradient id="rangeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis
                    dataKey="range"
                    stroke="#64748b"
                    fontSize={12}
                />
                <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }} />
                <Bar
                    dataKey="count"
                    fill="url(#rangeGradient)"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1200}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RangeChart;
