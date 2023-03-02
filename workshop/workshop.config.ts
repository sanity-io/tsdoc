import path from 'path'
import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'
// import {sanityTheme} from './theme/sanity'
// import {themePlugin} from './theme/themePlugin'
import {tsdocPlugin} from './tsdoc'

export default defineConfig({
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
    '@sanity/tsdoc': path.resolve(__dirname, '../exports/index.ts'),
  }
}
