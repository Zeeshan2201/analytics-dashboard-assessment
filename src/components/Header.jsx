import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    return (
        <motion.header
            className="header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="header__badge">
                <span>⚡</span>
                <span>Live Dashboard</span>
            </div>
            <h1 className="header__title">
                Electric Vehicle Population Analytics
            </h1>
            <p className="header__subtitle">
                Comprehensive analysis of EV adoption trends, manufacturer distribution,
                and geographic insights across Washington State
            </p>
        </motion.header>
    );
};

export default Header;
