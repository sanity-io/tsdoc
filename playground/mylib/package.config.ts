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
  tsconfig: 'tsconfig.dist.json',
})
