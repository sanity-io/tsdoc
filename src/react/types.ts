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
  name: string
  package: {name: string; scope: string | null}
  release: {version: string}
  members: SanityArrayItem<APIMember>[]
}
