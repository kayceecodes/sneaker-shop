module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
      "^@/components(.*)$": "<rootDir>/src/components/$1",
      "^@/theme(.*)$": "<rootDir>/src/theme/$1",
      "^@/src(.*)$": "<rootDir>/src/$1"
    }
  };
  