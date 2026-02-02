import React from 'react';

const Sidebar = ({ user, onLogout, isCollapsed, onToggle }) => {
    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
            <div className="sidebar__header">
                <div className="sidebar__logo">
                    <svg viewBox="0 0 100 100" className="sidebar__logo-icon">
                        <defs>
                            <linearGradient id="sidebarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#3b82f6' }} />
                                <stop offset="100%" style={{ stopColor: '#10b981' }} />
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="45" fill="url(#sidebarGrad)" />
                        <path d="M55 20L30 52H45L40 80L70 45H52L55 20Z" fill="white" />
                    </svg>
                    {!isCollapsed && <span className="sidebar__brand">EV Analytics</span>}
                </div>
                <button className="sidebar__toggle" onClick={onToggle} title={isCollapsed ? 'Expand' : 'Collapse'}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Hamburger button for collapsed state */}
            {isCollapsed && (
                <button className="sidebar__expand-btn" onClick={onToggle} title="Expand Sidebar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            <nav className="sidebar__nav">
                <div className="sidebar__section">
                    {!isCollapsed && <span className="sidebar__section-title">Main</span>}
                    <a href="#" className="sidebar__link sidebar__link--active" title="Dashboard">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                        {!isCollapsed && 'Dashboard'}
                    </a>
                    <a href="#" className="sidebar__link" title="Vehicle Search">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {!isCollapsed && 'Vehicle Search'}
                    </a>
                    <a href="#" className="sidebar__link" title="Analytics">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        {!isCollapsed && 'Analytics'}
                    </a>
                </div>

                <div className="sidebar__section">
                    {!isCollapsed && <span className="sidebar__section-title">Reports</span>}
                    <a href="#" className="sidebar__link" title="Geographic Data">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {!isCollapsed && 'Geographic Data'}
                    </a>
                    <a href="#" className="sidebar__link" title="Export Reports">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {!isCollapsed && 'Export Reports'}
                    </a>
                    <a href="#" className="sidebar__link" title="Manufacturer Stats">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {!isCollapsed && 'Manufacturers'}
                    </a>
                </div>

                <div className="sidebar__section">
                    {!isCollapsed && <span className="sidebar__section-title">Settings</span>}
                    <a href="#" className="sidebar__link" title="Preferences">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {!isCollapsed && 'Preferences'}
                    </a>
                    <a href="#" className="sidebar__link" title="Help & Support">
                        <svg className="sidebar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {!isCollapsed && 'Help & Support'}
                    </a>
                </div>
            </nav>

            <div className="sidebar__footer">
                <div className="sidebar__user">
                    <div className="sidebar__avatar">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                    {!isCollapsed && (
                        <div className="sidebar__user-info">
                            <span className="sidebar__user-name">{user?.name || 'Admin'}</span>
                            <span className="sidebar__user-email">{user?.email || 'admin@mapup.ai'}</span>
                        </div>
                    )}
                </div>
                <button onClick={onLogout} className="sidebar__logout" title="Sign Out">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
