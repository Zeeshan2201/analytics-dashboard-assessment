import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">Year {label}</p>
                <p className="custom-tooltip__value">
                    {payload[0].value.toLocaleString()} registrations
                </p>
            </div>
        );
    }
    return null;
};

const YearTrendChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            >
                <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis
                    dataKey="year"
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `'${String(value).slice(-2)}`}
                />
                <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorCount)"
                    animationDuration={1500}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default YearTrendChart;
