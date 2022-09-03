import {Sanity} from '../_lib/sanity'
import {APIExport} from './export'
import {APIPackage} from './package'
import {APIRelease} from './release'

/** @public */
export interface APIPackageDocument extends Omit<APIPackage, 'latestRelease' | 'releases'> {
  _id: string
  latestRelease: Sanity.ReferenceValue
}

/** @public */
export interface APIReleaseDocument extends Omit<APIRelease, 'package'> {
  _id: string
  package: Sanity.ReferenceValue
}

/** @public */
export interface APIExportDocument
  extends Omit<APIExport, 'exports' | 'members' | 'package' | 'release'> {
  _id: string
  package: Sanity.ReferenceValue
  release: Sanity.ReferenceValue
}

/** @public */
export interface APISymbolDocument {
  _id: string
  _type: 'api.symbol'
  name: string
  package: Sanity.ReferenceValue
}
