import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  exports: (exports) => ({
    ...exports,
    './cli': {
      source: './src/cli.ts',
      require: './dist/cli.cjs',
    },
  }),
  extract: {
    rules: {
      'ae-forgotten-export': 'warn',
    },
  },
  minify: false,
})
