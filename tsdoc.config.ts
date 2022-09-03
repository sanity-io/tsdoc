import {defineConfig} from '@sanity/tsdoc'
import pkgConfig from './package.config'

export default defineConfig({
  extract: pkgConfig.extract,
  tsconfig: pkgConfig.tsconfig,
})
