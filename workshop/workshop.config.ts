import path from 'node:path'

import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

// import {sanityTheme} from './theme/sanity'
// import {themePlugin} from './theme/themePlugin'
import {tsdocPlugin} from './tsdoc'

export default defineConfig({
  // @ts-expect-error find out why this is not working
  alias: getAliases(),
  pattern: ['../src/**/__workshop__/index.ts', '../src/**/__workshop__/index.tsx'],
  plugins: [
    // themePlugin({
    //   theme: sanityTheme,
    // }),
    tsdocPlugin(),
    perfPlugin(),
  ],
  port: 9009,
  title: '@sanity/tsdoc',
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
