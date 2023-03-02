import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    customTags: [
      {
        name: 'sampleCustomBlockTag',
        allowMultiple: true,
        syntaxKind: 'block',
      },
    ],
  },
  legacyExports: true,
  tsconfig: 'tsconfig.dist.json',
})
