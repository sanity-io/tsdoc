/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: require('./package.json').name,
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/playground/', '<rootDir>/test/__tmp__/'],
  globalSetup: '<rootDir>/test/_globalSetup.ts',
  globalTeardown: '<rootDir>/test/_globalTeardown.ts',
  testEnvironment: 'node',
  // - match all files in `__tests__` directories
  // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
  testRegex: '\\.test\\.[jt]sx?$',
  transform: {'^.+\\.tsx?$': ['esbuild-jest', {sourcemap: true}]},
}
