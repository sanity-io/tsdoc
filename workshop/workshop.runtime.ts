import path from 'node:path'

import {defineRuntime} from '@sanity/ui-workshop'

export default defineRuntime({
  pattern: ['../src/**/__workshop__/index.ts', '../src/**/__workshop__/index.tsx'],
  server: {
    port: 9009,
  },
  vite: (viteConfig) => ({
    ...viteConfig,
    resolve: {
      ...viteConfig.resolve,
      alias: {
        ...viteConfig.resolve?.alias,
        ...getAliases(),
      },
    },
  }),
})

function getAliases(): Record<string, string> | undefined {
  if (typeof window !== 'undefined') return undefined

  return {
    '@sanity/tsdoc/react': path.resolve(__dirname, '../exports/react.ts'),
    '@sanity/tsdoc/store': path.resolve(__dirname, '../exports/store.ts'),
    '@sanity/tsdoc/studio': path.resolve(__dirname, '../exports/studio.ts'),
    '@sanity/tsdoc': path.resolve(__dirname, '../exports/index.ts'),
  }
}
