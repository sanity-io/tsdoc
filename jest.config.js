/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: require('./package.json').name,
  modulePathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/test/__fixtures__/'],
  testEnvironment: 'node',
  // - match all files in `__tests__` directories
  // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
  testRegex: '(/__tests__/.*|\\.test)\\.[jt]sx?$',
  transform: {'^.+\\.tsx?$': ['esbuild-jest', {sourcemap: true}]},
}
