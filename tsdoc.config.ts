import path from 'path'
import {defineConfig} from '@sanity/tsdoc'
import pkgConfig from './package.config'

export default defineConfig({
  app: {
    alias: {
      '@sanity/tsdoc/react': path.resolve(__dirname, './exports/react.ts'),
      '@sanity/tsdoc/store': path.resolve(__dirname, './exports/store.ts'),
      '@sanity/tsdoc/studio': path.resolve(__dirname, './exports/studio.ts'),
      '@sanity/tsdoc': path.resolve(__dirname, './exports/index.ts'),
      react: path.resolve(__dirname, './node_modules/react'),
    },
  },

  input: {
    type: 'fs',
    tsconfig: pkgConfig.tsconfig,
  },

  output: {
    sanity: {
      projectId: process.env['SANITY_PROJECT_ID'],
      dataset: process.env['SANITY_DATASET'],
      token: process.env['SANITY_TOKEN'],
    },
  },
})
