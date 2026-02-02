import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Demo credentials
    const DEMO_EMAIL = 'admin@mapup.ai';
    const DEMO_PASSWORD = 'mapup2024';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                onLogin({ email, name: 'Admin User' });
            } else {
                setError('Invalid email or password');
            }
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="login-page">
            <div className="login-bg">
                <div className="login-bg__gradient"></div>
                <div className="login-bg__grid"></div>
            </div>

            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <div className="login-logo">
                            <svg viewBox="0 0 100 100" className="login-logo__icon">
                                <defs>
                                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                                        <stop offset="100%" style={{ stopColor: '#10b981' }} />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="45" fill="url(#logoGrad)" />
                                <path d="M55 20L30 52H45L40 80L70 45H52L55 20Z" fill="white" />
                            </svg>
                        </div>
                        <h1 className="login-title">EV Analytics Platform</h1>
                        <p className="login-subtitle">Washington State Electric Vehicle Dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="form-error">{error}</div>}

                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? (
                                <span className="login-btn__loader"></span>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </button>
                    </form>

                    <div className="login-demo">
                        <p className="login-demo__title">Demo Credentials:</p>
                        <div className="login-demo__creds">
                            <div className="login-demo__row">
                                <span className="login-demo__label">Email:</span>
                                <code className="login-demo__value">{DEMO_EMAIL}</code>
                            </div>
                            <div className="login-demo__row">
                                <span className="login-demo__label">Password:</span>
                                <code className="login-demo__value">{DEMO_PASSWORD}</code>
                            </div>
                        </div>
                    </div>

                    <div className="login-footer">
                        <p>Powered by MapUp Analytics</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
