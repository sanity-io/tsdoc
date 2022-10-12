import {SanityArrayItem} from '../_lib/sanity'
import {APIExport} from './export'
import {APIPackage} from './package'

/** @public */
export interface APIRelease {
  _type: 'api.release'
  exports: SanityArrayItem<APIExport>[]
  package: APIPackage
  version: string
}
