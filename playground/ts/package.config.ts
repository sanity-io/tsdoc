import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    customTags: [
      {
        name: 'hidden',
        syntaxKind: 'modifier',
        allowMultiple: false,
      },
    ],
    rules: {
      'ae-missing-release-tag': 'warn',
    },
  },
  legacyExports: true,
})
