import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  tsconfig: 'tsconfig.dist.json',
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
})
