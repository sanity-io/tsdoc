import {PkgConfigOptions} from '@sanity/pkg-utils'

/** @public */
export interface SanityTSDocConfigOptions {
  extract?: PkgConfigOptions['extract']
  tsconfig?: string
}
