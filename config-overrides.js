// config-overrides.js
module.exports = function override(config, env) {
    // Modify Jest config
    if (env === 'test') {
        config.jest.collectCoverage = true;
        config.jest.collectCoverageFrom = ['src/**/*.{js,jsx}'];
        config.jest.coverageReporters = ['text', 'lcov'];
        config.jest.coverageThreshold = {
            global: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        };
        config.jest.coverageDirectory = './coverage';
    }

    return config;
};
