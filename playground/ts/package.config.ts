import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-missing-release-tag': 'warn',
    },
  },

  minify: false,
})
