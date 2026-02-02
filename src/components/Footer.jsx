import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__text">
                Data Source:{' '}
                <a
                    href="https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__link"
                >
                    Electric Vehicle Population Dataset (Kaggle)
                </a>
                {' '} • Built with React & Recharts
            </p>
            <p className="footer__text" style={{ marginTop: '0.5rem', opacity: 0.7 }}>
                © 2024 EV Analytics Dashboard
            </p>
        </footer>
    );
};

export default Footer;
