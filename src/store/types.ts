import {APIMember, APIPackage, APISymbol, SanityArrayItem} from '@sanity/tsdoc'

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

/** @public */
export interface TSDocStore {
  exports: {
    get: (params: {
      packageScope: string | null
      packageName: string
      releaseVersion: string
    }) => Promise<TSDocExportData[]>
  }

  member: {
    get: (params: TSDocAppParams) => Promise<(APIMember & {versions: string[]}) | null>
  }

  package: {
    get: (params: TSDocAppParams) => Promise<APIPackage | null>
  }

  packages: {
    get: () => Promise<APIPackage[] | null>
  }

  symbol: {
    get: (params: {
      name: string
      packageName: string
      packageScope: string | null
    }) => Promise<(APISymbol & {members: APIMember[]}) | null>
    search: (params: {
      query: string
      packageName: string
      packageScope: string | null
    }) => Promise<
      (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
    >
  }
}
