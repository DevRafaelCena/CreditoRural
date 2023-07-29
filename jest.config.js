module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,    
    coveragePathIgnorePatterns: [
        "/src/db/"
    ],
    collectCoverageFrom: ['src/**/*.js']
  };
  