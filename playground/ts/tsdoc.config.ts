import {defineConfig} from '@sanity/tsdoc'
import packageConfig from './package.config'

export default defineConfig({
  extract: packageConfig.extract,
  legacyExports: packageConfig.legacyExports,
  input: {
    type: 'fs',
    tsconfig: packageConfig.tsconfig,
  },
})
