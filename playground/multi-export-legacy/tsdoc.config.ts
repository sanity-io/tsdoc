import {defineConfig} from '@sanity/tsdoc'

import packageConfig from './package.config'

export default defineConfig({
  extract: packageConfig.extract,
  // @ts-expect-error - not implemented yet
  legacyExports: packageConfig.legacyExports,
  input: {
    type: 'fs',
    tsconfig: packageConfig.tsconfig,
  },
})
