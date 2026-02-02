import React from 'react';

const FilterBar = ({
    filters,
    onFilterChange,
    uniqueYears,
    uniqueMakes,
    uniqueCounties,
    onReset
}) => {
    return (
        <div className="filter-bar">
            <div className="filter-bar__header">
                <div className="filter-bar__title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                </div>
                <button className="filter-bar__reset" onClick={onReset}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset All
                </button>
            </div>

            <div className="filter-bar__filters">
                {/* Year Filter */}
                <div className="filter-group">
                    <label className="filter-group__label">Model Year</label>
                    <select
                        className="filter-group__select"
                        value={filters.year}
                        onChange={(e) => onFilterChange('year', e.target.value)}
                    >
                        <option value="">All Years</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* EV Type Filter */}
                <div className="filter-group">
                    <label className="filter-group__label">EV Type</label>
                    <select
                        className="filter-group__select"
                        value={filters.evType}
                        onChange={(e) => onFilterChange('evType', e.target.value)}
                    >
                        <option value="">All Types</option>
                        <option value="BEV">Battery Electric (BEV)</option>
                        <option value="PHEV">Plug-in Hybrid (PHEV)</option>
                    </select>
                </div>

                {/* Manufacturer Filter */}
                <div className="filter-group">
                    <label className="filter-group__label">Manufacturer</label>
                    <select
                        className="filter-group__select"
                        value={filters.make}
                        onChange={(e) => onFilterChange('make', e.target.value)}
                    >
                        <option value="">All Manufacturers</option>
                        {uniqueMakes.slice(0, 20).map(make => (
                            <option key={make} value={make}>{make}</option>
                        ))}
                    </select>
                </div>

                {/* County Filter */}
                <div className="filter-group">
                    <label className="filter-group__label">County</label>
                    <select
                        className="filter-group__select"
                        value={filters.county}
                        onChange={(e) => onFilterChange('county', e.target.value)}
                    >
                        <option value="">All Counties</option>
                        {uniqueCounties.slice(0, 20).map(county => (
                            <option key={county} value={county}>{county}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Active Filters */}
            {(filters.year || filters.evType || filters.make || filters.county) && (
                <div className="filter-bar__active">
                    <span className="filter-bar__active-label">Active:</span>
                    {filters.year && (
                        <span className="filter-tag">
                            Year: {filters.year}
                            <button onClick={() => onFilterChange('year', '')}>×</button>
                        </span>
                    )}
                    {filters.evType && (
                        <span className="filter-tag">
                            Type: {filters.evType}
                            <button onClick={() => onFilterChange('evType', '')}>×</button>
                        </span>
                    )}
                    {filters.make && (
                        <span className="filter-tag">
                            Make: {filters.make}
                            <button onClick={() => onFilterChange('make', '')}>×</button>
                        </span>
                    )}
                    {filters.county && (
                        <span className="filter-tag">
                            County: {filters.county}
                            <button onClick={() => onFilterChange('county', '')}>×</button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterBar;
