import {defineConfig} from '@sanity/tsdoc'

import packageConfig from './package.config'

export default defineConfig({
  extract: packageConfig.extract,
  input: {
    type: 'fs',
    tsconfig: 'tsconfig.tsdoc.json',
    bundledPackages: ['ts'],
  },
})
