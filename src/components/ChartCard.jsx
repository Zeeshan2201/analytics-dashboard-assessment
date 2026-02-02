import React from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, className = '', delay = 0 }) => {
    return (
        <motion.div
            className={`chart-card ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className="chart-card__header">
                <div>
                    <h3 className="chart-card__title">{title}</h3>
                    {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
                </div>
            </div>
            <div className="chart-card__content">
                {children}
            </div>
        </motion.div>
    );
};

export default ChartCard;
