import {APIMember, APIPackage, APISymbol} from '@sanity/tsdoc'
import {TSDocAppParams, TSDocExportData} from '../types'

/** @public */
export interface TSDocStore {
  exports: {
    get: () => Promise<TSDocExportData[]>
  }

  member: {
    get: (
      params: TSDocAppParams
    ) => Promise<(APIMember & {members: {exportPath: string; releaseVersion: string}}) | null>
  }

  package: {
    get: (params: TSDocAppParams) => Promise<APIPackage | null>
  }

  symbol: {
    get: (params: {
      name: string
      packageName: string
      packageScope: string | null
    }) => Promise<(APISymbol & {members: APIMember[]}) | null>
    search: (
      query: string
    ) => Promise<
      (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
    >
  }
}
