import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    globalSetup: ['./test/_setupFolders.ts'],
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      if (log.includes('Using tsconfig') && type === 'stdout') {
        return false
      }
    },
    // Enable rich PR failed test annotation on the CI
    reporters: process.env.GITHUB_ACTIONS ? ['default', 'github-actions'] : 'default',
    watchExclude: [
      '**/.tsdoc/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/etc/**',
      '**/__tmp__/**',
      'pnpm-lock.yaml',
    ],
  },
})
