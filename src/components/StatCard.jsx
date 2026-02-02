import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, value, label, trend, trendUp, suffix = '', delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Convert value to string first, then parse
    const valueString = String(value || '0');
    const numericValue = parseInt(valueString.replace(/,/g, '')) || 0;

    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            if (step >= steps) {
                setDisplayValue(numericValue);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [numericValue]);

    const formatValue = (val) => {
        return val.toLocaleString() + suffix;
    };

    return (
        <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02 }}
        >
            <div className="stat-card__icon">{icon}</div>
            <div className="stat-card__value">{formatValue(displayValue)}</div>
            <div className="stat-card__label">{label}</div>
            {trend && (
                <div className={`stat-card__trend ${trendUp ? 'stat-card__trend--up' : 'stat-card__trend--down'}`}>
                    {trendUp ? '↑' : '↓'} {trend}
                </div>
            )}
        </motion.div>
    );
};

export default StatCard;
