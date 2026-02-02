import Papa from 'papaparse';

/**
 * Load and parse CSV data
 */
export const loadCSVData = async () => {
    try {
        // Try multiple paths
        const paths = [
            '/Electric_Vehicle_Population_Data.csv',
            './Electric_Vehicle_Population_Data.csv',
            'Electric_Vehicle_Population_Data.csv'
        ];

        let csvText = null;
        let lastError = null;

        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    csvText = await response.text();
                    console.log('CSV loaded from:', path);
                    break;
                }
            } catch (e) {
                lastError = e;
            }
        }

        if (!csvText) {
            throw new Error('Failed to load CSV from any path');
        }

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    console.log('Parsed', results.data.length, 'records');
                    resolve(results.data);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error loading CSV:', error);
        throw error;
    }
};


/**
 * Get total counts and basic stats
 */
export const getBasicStats = (data) => {
    const totalEVs = data.length;
    const bevCount = data.filter(d => d['Electric Vehicle Type']?.includes('Battery Electric')).length;
    const phevCount = data.filter(d => d['Electric Vehicle Type']?.includes('Plug-in Hybrid')).length;

    const ranges = data
        .map(d => parseInt(d['Electric Range']) || 0)
        .filter(r => r > 0);

    const avgRange = ranges.length > 0
        ? Math.round(ranges.reduce((a, b) => a + b, 0) / ranges.length)
        : 0;

    const uniqueMakes = new Set(data.map(d => d['Make'])).size;
    const uniqueCities = new Set(data.map(d => d['City'])).size;

    return { totalEVs, bevCount, phevCount, avgRange, uniqueMakes, uniqueCities };
};

/**
 * Get EV Type distribution (BEV vs PHEV)
 */
export const getEVTypeDistribution = (data) => {
    const typeCount = {};

    data.forEach(d => {
        const type = d['Electric Vehicle Type'];
        if (type) {
            const shortType = type.includes('Battery Electric') ? 'BEV' : 'PHEV';
            typeCount[shortType] = (typeCount[shortType] || 0) + 1;
        }
    });

    return Object.entries(typeCount).map(([name, value]) => ({
        name,
        value,
        fullName: name === 'BEV' ? 'Battery Electric Vehicle' : 'Plug-in Hybrid Electric Vehicle'
    }));
};

/**
 * Get top manufacturers by vehicle count
 */
export const getManufacturerStats = (data, limit = 10) => {
    const makeCount = {};

    data.forEach(d => {
        const make = d['Make'];
        if (make) {
            makeCount[make] = (makeCount[make] || 0) + 1;
        }
    });

    return Object.entries(makeCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
};

/**
 * Get model year trends
 */
export const getModelYearTrends = (data) => {
    const yearCount = {};

    data.forEach(d => {
        const year = parseInt(d['Model Year']);
        if (year && year >= 2010 && year <= 2024) {
            yearCount[year] = (yearCount[year] || 0) + 1;
        }
    });

    return Object.entries(yearCount)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([year, count]) => ({ year: parseInt(year), count }));
};

/**
 * Get top cities by EV count
 */
export const getCityDistribution = (data, limit = 12) => {
    const cityCount = {};

    data.forEach(d => {
        const city = d['City'];
        if (city) {
            cityCount[city] = (cityCount[city] || 0) + 1;
        }
    });

    return Object.entries(cityCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
};

/**
 * Get county distribution
 */
export const getCountyDistribution = (data, limit = 10) => {
    const countyCount = {};

    data.forEach(d => {
        const county = d['County'];
        if (county) {
            countyCount[county] = (countyCount[county] || 0) + 1;
        }
    });

    return Object.entries(countyCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
};

/**
 * Get CAFV eligibility breakdown
 */
export const getCAFVStats = (data) => {
    const eligibilityCount = {};

    data.forEach(d => {
        let status = d['Clean Alternative Fuel Vehicle (CAFV) Eligibility'];
        if (status) {
            // Simplify status names
            if (status.includes('Eligible') && !status.includes('Not eligible')) {
                status = 'Eligible';
            } else if (status.includes('Not eligible')) {
                status = 'Not Eligible';
            } else {
                status = 'Unknown';
            }
            eligibilityCount[status] = (eligibilityCount[status] || 0) + 1;
        }
    });

    return Object.entries(eligibilityCount)
        .map(([name, value]) => ({ name, value }));
};

/**
 * Get electric range distribution
 */
export const getRangeDistribution = (data) => {
    const rangeBuckets = {
        '0-50': 0,
        '51-100': 0,
        '101-150': 0,
        '151-200': 0,
        '201-250': 0,
        '251-300': 0,
        '300+': 0
    };

    data.forEach(d => {
        const range = parseInt(d['Electric Range']) || 0;
        if (range === 0) return; // Skip zero range

        if (range <= 50) rangeBuckets['0-50']++;
        else if (range <= 100) rangeBuckets['51-100']++;
        else if (range <= 150) rangeBuckets['101-150']++;
        else if (range <= 200) rangeBuckets['151-200']++;
        else if (range <= 250) rangeBuckets['201-250']++;
        else if (range <= 300) rangeBuckets['251-300']++;
        else rangeBuckets['300+']++;
    });

    return Object.entries(rangeBuckets)
        .map(([range, count]) => ({ range, count }));
};

/**
 * Get top models
 */
export const getTopModels = (data, limit = 10) => {
    const modelCount = {};

    data.forEach(d => {
        const make = d['Make'];
        const model = d['Model'];
        if (make && model) {
            const fullName = `${make} ${model}`;
            modelCount[fullName] = (modelCount[fullName] || 0) + 1;
        }
    });

    return Object.entries(modelCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
};

/**
 * Get utility provider distribution
 */
export const getUtilityProviders = (data, limit = 8) => {
    const utilityCount = {};

    data.forEach(d => {
        let utility = d['Electric Utility'];
        if (utility) {
            // Clean up utility names - take first one if multiple
            utility = utility.split('|')[0].trim();
            // Shorten long names
            utility = utility.replace(' - (WA)', '').replace('||', '').trim();
            if (utility.length > 25) {
                utility = utility.substring(0, 25) + '...';
            }
            utilityCount[utility] = (utilityCount[utility] || 0) + 1;
        }
    });

    return Object.entries(utilityCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([name, count]) => ({ name, count }));
};

/**
 * Get yearly growth rate
 */
export const getYearlyGrowth = (data) => {
    const yearTrends = getModelYearTrends(data);
    if (yearTrends.length < 2) return 0;

    const lastTwoYears = yearTrends.slice(-2);
    const previousYear = lastTwoYears[0]?.count || 1;
    const currentYear = lastTwoYears[1]?.count || 0;

    return Math.round(((currentYear - previousYear) / previousYear) * 100);
};
