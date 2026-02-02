import React from 'react';

const Topbar = ({ user, sidebarCollapsed, totalEVs }) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="topbar">
            <div className="topbar__left">
                <div className="topbar__info">
                    <h1 className="topbar__title">Dashboard Overview</h1>
                    <span className="topbar__date">{currentDate}</span>
                </div>
            </div>

            <div className="topbar__center">
                {totalEVs > 0 && (
                    <div className="topbar__stats">
                        <div className="topbar__stat">
                            <span className="topbar__stat-value">{totalEVs.toLocaleString()}</span>
                            <span className="topbar__stat-label">Total EVs</span>
                        </div>
                        <div className="topbar__stat-divider"></div>
                        <div className="topbar__stat">
                            <span className="topbar__stat-value topbar__stat-value--live">
                                <span className="topbar__live-dot"></span>
                                Live
                            </span>
                            <span className="topbar__stat-label">Data Status</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="topbar__right">
                <div className="topbar__search">
                    <svg className="topbar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search vehicles, cities..."
                        className="topbar__search-input"
                    />
                </div>

                <button className="topbar__btn topbar__btn--refresh" title="Refresh Data">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>

                <button className="topbar__btn" title="Notifications">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span className="topbar__badge">3</span>
                </button>

                <button className="topbar__btn" title="Settings">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                <div className="topbar__user">
                    <div className="topbar__user-avatar">
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
