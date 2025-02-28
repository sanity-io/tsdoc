import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    customTags: [
      {
        name: 'sampleCustomBlockTag',
        allowMultiple: true,
        syntaxKind: 'block',
      },
      {
        name: 'hidden',
        syntaxKind: 'modifier',
        allowMultiple: false,
      },
    ],
  },
  tsconfig: 'tsconfig.dist.json',
})
