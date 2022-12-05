/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],

  coverageProvider: 'v8',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['json', 'lcovonly', 'text', 'cobertura'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  }
};