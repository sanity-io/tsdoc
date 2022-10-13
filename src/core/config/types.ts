import {PkgConfigOptions} from '@sanity/pkg-utils'

/** @public */
export interface SanityTSDocConfigOptions {
  extract?: PkgConfigOptions['extract']
  sanity?: {
    projectId?: string
    dataset?: string
    token?: string
  }
  tsconfig?: string
}
