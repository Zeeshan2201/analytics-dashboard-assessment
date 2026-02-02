import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    loadCSVData,
    getBasicStats,
    getEVTypeDistribution,
    getManufacturerStats,
    getModelYearTrends,
    getCityDistribution,
    getCountyDistribution,
    getCAFVStats,
    getRangeDistribution,
    getTopModels,
    getUtilityProviders
} from './utils/dataProcessor';

// Components
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import FilterBar from './components/FilterBar';
import StatCard from './components/StatCard';
import ChartCard from './components/ChartCard';
import Footer from './components/Footer';

// Charts
import EVTypeChart from './components/charts/EVTypeChart';
import ManufacturersChart from './components/charts/ManufacturersChart';
import YearTrendChart from './components/charts/YearTrendChart';
import TopCitiesChart from './components/charts/TopCitiesChart';
import CountyChart from './components/charts/CountyChart';
import CAFVChart from './components/charts/CAFVChart';
import RangeChart from './components/charts/RangeChart';
import TopModelsChart from './components/charts/TopModelsChart';
import UtilityChart from './components/charts/UtilityChart';

function App() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Filter State
    const [filters, setFilters] = useState({
        year: '',
        evType: '',
        make: '',
        county: ''
    });

    // Check for saved session
    useEffect(() => {
        const savedUser = localStorage.getItem('ev_dashboard_user');
        const savedSidebar = localStorage.getItem('ev_sidebar_collapsed');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedSidebar) {
            setSidebarCollapsed(JSON.parse(savedSidebar));
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const csvData = await loadCSVData();
                setData(csvData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('ev_dashboard_user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('ev_dashboard_user');
        setData([]);
        setLoading(true);
    };

    const toggleSidebar = () => {
        const newState = !sidebarCollapsed;
        setSidebarCollapsed(newState);
        localStorage.setItem('ev_sidebar_collapsed', JSON.stringify(newState));
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleResetFilters = () => {
        setFilters({ year: '', evType: '', make: '', county: '' });
    };

    // Extract unique values for filters
    const { uniqueYears, uniqueMakes, uniqueCounties } = useMemo(() => {
        if (!data.length) return { uniqueYears: [], uniqueMakes: [], uniqueCounties: [] };

        const years = [...new Set(data.map(d => d['Model Year']).filter(Boolean))].sort((a, b) => b - a);
        const makes = [...new Set(data.map(d => d.Make).filter(Boolean))].sort();
        const counties = [...new Set(data.map(d => d.County).filter(Boolean))].sort();

        return { uniqueYears: years, uniqueMakes: makes, uniqueCounties: counties };
    }, [data]);

    // Apply filters
    const filteredData = useMemo(() => {
        if (!data.length) return [];

        return data.filter(item => {
            if (filters.year && item['Model Year'] !== filters.year) return false;
            if (filters.evType && item['Electric Vehicle Type'] && !item['Electric Vehicle Type'].includes(filters.evType)) return false;
            if (filters.make && item.Make !== filters.make) return false;
            if (filters.county && item.County !== filters.county) return false;
            return true;
        });
    }, [data, filters]);

    // Memoized data processing using filteredData
    const stats = useMemo(() => filteredData.length > 0 ? getBasicStats(filteredData) : null, [filteredData]);
    const evTypeData = useMemo(() => getEVTypeDistribution(filteredData), [filteredData]);
    const manufacturerData = useMemo(() => getManufacturerStats(filteredData), [filteredData]);
    const yearTrendData = useMemo(() => getModelYearTrends(filteredData), [filteredData]);
    const cityData = useMemo(() => getCityDistribution(filteredData), [filteredData]);
    const countyData = useMemo(() => getCountyDistribution(filteredData), [filteredData]);
    const cafvData = useMemo(() => getCAFVStats(filteredData), [filteredData]);
    const rangeData = useMemo(() => getRangeDistribution(filteredData), [filteredData]);
    const topModelsData = useMemo(() => getTopModels(filteredData), [filteredData]);
    const utilityData = useMemo(() => getUtilityProviders(filteredData), [filteredData]);

    // Show login if not authenticated
    if (!user) {
        return <LoginPage onLogin={handleLogin} />;
    }

    if (loading) {
        return (
            <div className={`admin-layout ${sidebarCollapsed ? 'admin-layout--collapsed' : ''}`}>
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={sidebarCollapsed}
                    onToggle={toggleSidebar}
                />
                <main className="main-content">
                    <Topbar
                        user={user}
                        sidebarCollapsed={sidebarCollapsed}
                        totalEVs={0}
                    />
                    <div className="loading">
                        <div className="loading__spinner"></div>
                        <p className="loading__text">Loading EV Population Data...</p>
                        <p className="loading__subtext">Processing 50,000+ vehicle records</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`admin-layout ${sidebarCollapsed ? 'admin-layout--collapsed' : ''}`}>
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={sidebarCollapsed}
                    onToggle={toggleSidebar}
                />
                <main className="main-content">
                    <Topbar
                        user={user}
                        sidebarCollapsed={sidebarCollapsed}
                        totalEVs={0}
                    />
                    <div className="loading">
                        <div className="error-icon">⚠️</div>
                        <p className="loading__text" style={{ color: '#ef4444' }}>Error Loading Data</p>
                        <p className="loading__subtext">{error}</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={`admin-layout ${sidebarCollapsed ? 'admin-layout--collapsed' : ''}`}>
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={sidebarCollapsed}
                onToggle={toggleSidebar}
            />

            <main className="main-content">
                <Topbar
                    user={user}
                    sidebarCollapsed={sidebarCollapsed}
                    totalEVs={stats?.totalEVs || 0}
                />

                <div className="dashboard">
                    {/* Welcome Banner */}
                    <motion.div
                        className="welcome-banner"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="welcome-banner__content">
                            <h2 className="welcome-banner__title">
                                Welcome back, {user?.name?.split(' ')[0] || 'Admin'}! 👋
                            </h2>
                            <p className="welcome-banner__text">
                                Here's an overview of Washington State's electric vehicle population data.
                            </p>
                        </div>
                        <div className="welcome-banner__actions">
                            <button className="welcome-banner__btn welcome-banner__btn--primary">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export Report
                            </button>
                            <button className="welcome-banner__btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </motion.div>

                    {/* Filter Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                    >
                        <FilterBar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            uniqueYears={uniqueYears}
                            uniqueMakes={uniqueMakes}
                            uniqueCounties={uniqueCounties}
                            onReset={handleResetFilters}
                        />
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        className="stats-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <StatCard
                            icon="🚗"
                            value={stats?.totalEVs?.toLocaleString() || '0'}
                            label="Total Registered EVs"
                            trend="+12.5%"
                            trendUp={true}
                            delay={0}
                        />
                        <StatCard
                            icon="🔋"
                            value={stats?.bevCount?.toLocaleString() || '0'}
                            label="Battery Electric (BEV)"
                            trend="+15.2%"
                            trendUp={true}
                            delay={0.1}
                        />
                        <StatCard
                            icon="⚡"
                            value={stats?.phevCount?.toLocaleString() || '0'}
                            label="Plug-in Hybrid (PHEV)"
                            delay={0.2}
                        />
                        <StatCard
                            icon="📊"
                            value={stats?.avgRange?.toString() || '0'}
                            label="Avg Electric Range"
                            suffix=" miles"
                            delay={0.3}
                        />
                    </motion.div>

                    {/* Charts Grid */}
                    <div className="charts-grid">
                        <ChartCard
                            title="Vehicle Type Distribution"
                            subtitle="BEV vs PHEV breakdown"
                            className="chart-card--third"
                            delay={0.2}
                        >
                            <EVTypeChart data={evTypeData} />
                        </ChartCard>

                        <ChartCard
                            title="Top Manufacturers"
                            subtitle="Vehicle registrations by make"
                            className="chart-card--two-thirds"
                            delay={0.3}
                        >
                            <ManufacturersChart data={manufacturerData} />
                        </ChartCard>

                        <ChartCard
                            title="Registration Trends"
                            subtitle="EV adoption by model year"
                            className="chart-card--full"
                            delay={0.4}
                        >
                            <YearTrendChart data={yearTrendData} />
                        </ChartCard>

                        <ChartCard
                            title="Top Cities"
                            subtitle="Highest EV populations"
                            className="chart-card--half"
                            delay={0.5}
                        >
                            <TopCitiesChart data={cityData} />
                        </ChartCard>

                        <ChartCard
                            title="County Distribution"
                            subtitle="Regional breakdown"
                            className="chart-card--half"
                            delay={0.6}
                        >
                            <CountyChart data={countyData} />
                        </ChartCard>

                        <ChartCard
                            title="CAFV Eligibility"
                            subtitle="Clean fuel program status"
                            className="chart-card--third"
                            delay={0.7}
                        >
                            <CAFVChart data={cafvData} />
                        </ChartCard>

                        <ChartCard
                            title="Electric Range Analysis"
                            subtitle="Range distribution in miles"
                            className="chart-card--two-thirds"
                            delay={0.8}
                        >
                            <RangeChart data={rangeData} />
                        </ChartCard>

                        <ChartCard
                            title="Popular Models"
                            subtitle="Top registered vehicles"
                            className="chart-card--half"
                            delay={0.9}
                        >
                            <TopModelsChart data={topModelsData} />
                        </ChartCard>

                        <ChartCard
                            title="Utility Providers"
                            subtitle="Electric service areas"
                            className="chart-card--half"
                            delay={1.0}
                        >
                            <UtilityChart data={utilityData} />
                        </ChartCard>
                    </div>

                    <Footer />
                </div>
            </main>
        </div>
    );
}

export default App;
