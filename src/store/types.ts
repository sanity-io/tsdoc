import {APIMember, APIPackage, APISymbol, SanityArrayItem} from '@sanity/tsdoc'

/** @public */
export interface TSDocAppParams {
  exportPath: string | null
  memberName: string | null
  packageName: string | null
  packageScope: string | null
  releaseVersion: string | null
  memberSlug: string | null
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
export type TSDocAPIMember = APIMember & {versions: string[]}
/** @public */
export type TSDocAPISymbol = APISymbol & {members: TSDocAPIMember[]}
/** @public */
export type TSDocSymbolSearchResult = (APISymbol & {
  _id: string
  members: {exportPath: string; releaseVersion: string}[]
})[]

/** @public */
export interface TSDocStore {
  exports: {
    get: (params: {
      packageScope: string | null
      packageName: string
      releaseVersion: string
    }) => Promise<TSDocExportData[] | undefined>
  }

  member: {
    get: (params: TSDocAppParams) => Promise<TSDocAPIMember | null | undefined>
  }

  package: {
    get: (params: TSDocAppParams) => Promise<APIPackage | null | undefined>
  }

  packages: {
    get: () => Promise<APIPackage[] | null | undefined>
  }

  symbol: {
    get: (params: {
      name: string
      packageName: string
      packageScope: string | null
    }) => Promise<TSDocAPISymbol | null | undefined>
    search: (params: {
      query: string
      packageName: string
      packageScope: string | null
    }) => Promise<TSDocSymbolSearchResult[]>
  }
}

/** @beta */
export interface TSDocStoreCache {
  exports: Record<string, TSDocExportData[]>
  member: Record<string, TSDocAPIMember>
  package: Record<string, APIPackage | null>
  packages: APIPackage[]
  symbol: Record<string, TSDocAPISymbol>
}
