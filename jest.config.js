module.exports =  {
    testTimeout: 90000,
    coverageDirectory: './tests/coverage/',
    collectCoverage: true,
    roots: ['./tests'],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js?$',
    "coveragePathIgnorePatterns": [
        "node_modules",
        "<rootDir>/tests",
        "<rootDir>/config",
        "<rootDir>/app/models",
        "<rootDir>/helpers",
        "<rootDir>/errors",
        "server.js",
        "app.js"
    ],
    coverageThreshold: {
        "global": {
            "branches": 85,
            "functions": 85,
            "lines": 85,
            "statements": -10
        }
    }
};
