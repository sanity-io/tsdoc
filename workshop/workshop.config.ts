import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/plugin-perf'

// import {sanityTheme} from './theme/sanity'
// import {themePlugin} from './theme/themePlugin'
import {tsdocPlugin} from './tsdoc'

export default defineConfig({
  plugins: [
    // themePlugin({
    //   theme: sanityTheme,
    // }),
    tsdocPlugin(),
    perfPlugin(),
  ],
  title: '@sanity/tsdoc',
})
