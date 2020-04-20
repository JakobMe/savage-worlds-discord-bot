module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['src/classes/**/*.ts', 'src/commands/**/*.ts', 'src/utils/**/*.ts'],
  roots: ['<rootDir>/test', '<rootDir>/src'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  testRegex: '^.+\\.spec.ts',
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};
