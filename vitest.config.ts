import {defineConfig} from 'vitest/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineConfig({
  test: {
    globalSetup: ['./test/_setupFolders.ts'],
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      if (log.includes('Using tsconfig') && type === 'stdout') {
        return false
      }
    },
    // Enable rich PR failed test annotation on the CI
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
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
