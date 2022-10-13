import {defineConfig} from '@sanity/tsdoc'
import pkgConfig from './package.config'

export default defineConfig({
  extract: pkgConfig.extract,
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
  },
  tsconfig: pkgConfig.tsconfig,
})
