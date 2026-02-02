import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
    'Eligible': '#10b981',
    'Unknown': '#f59e0b',
    'Not Eligible': '#ef4444'
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="custom-tooltip">
                <p className="custom-tooltip__label">{data.name}</p>
                <p className="custom-tooltip__value">
                    {data.value.toLocaleString()} vehicles
                </p>
            </div>
        );
    }
    return null;
};

const CAFVChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[entry.name] || '#6366f1'}
                            stroke="transparent"
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            {value}
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CAFVChart;
