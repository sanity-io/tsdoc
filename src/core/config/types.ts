import {PkgConfigOptions} from '@sanity/pkg-utils'

/** @public */
export interface SanityTSDocConfigOptions {
  app?: {
    alias?: Record<string, string>
    port?: number
  }
  extract?: PkgConfigOptions['extract']
  input?: {
    type: 'fs'
    pattern?: string | string[]
    tsconfig?: string
  }
  output?: {
    fs?: {
      outDir?: string
    }
    sanity?: {
      projectId?: string
      dataset?: string
      token?: string
    }
  }
}
