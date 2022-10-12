import {APIMember, SanityArrayItem} from '@sanity/tsdoc'

/** @public */
export interface TSDocAppParams {
  exportPath: string | null
  memberName: string | null
  packageName: string | null
  packageScope: string | null
  releaseVersion: string | null
}

/** @public */
export interface TSDocExportData {
  isLatest: boolean
  name: string
  package: {name: string; scope: string | null}
  path: string
  release: {version: string}
  members: SanityArrayItem<APIMember>[]
}
