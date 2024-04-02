import {defineConfig} from 'vitest/config'
import GithubActionsReporter from 'vitest-github-actions-reporter'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./test/_setup.ts'],
    // Enable rich PR failed test annotation on the CI
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
  },
  esbuild: {
    target: 'node14',
  },
})
