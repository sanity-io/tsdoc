import type {PkgConfigOptions} from '@sanity/pkg-utils'

/** @public */
export interface SanityTSDocConfigOptions {
  app?: {
    alias?: Record<string, string>
    port?: number
  }
  extract?: PkgConfigOptions['extract']
  legacyExports?: PkgConfigOptions['legacyExports']
  input?: {
    type: 'fs'
    pattern?: string | string[]
    tsconfig?: string
    bundledPackages?: string[]
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
