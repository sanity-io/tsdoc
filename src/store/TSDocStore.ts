/* eslint-disable no-console */
import {APIPackage} from '@sanity/tsdoc'

import {API_MEMBER_TYPES} from './constants'
import {
  API_EXPORTS_QUERY,
  API_MEMBER_QUERY,
  API_PACKAGE_QUERY,
  API_PACKAGES_QUERY,
  API_SYMBOL_QUERY,
  API_SYMBOL_SEARCH_QUERY,
} from './queries'
import {
  TSDocAPIMember,
  TSDocAPISymbol,
  TSDocAppParams,
  TSDocExportData,
  TSDocStore,
  TSDocStoreCache,
  TSDocSymbolSearchResult,
} from './types'

/** @beta */
export interface TSDocStoreOptions {
  debug?: boolean
  query: (q: string, params: Record<string, unknown>) => Promise<any>
  initialState?: TSDocStoreCache
}

/**
 * A function for creating a TSDocStore instance.
 *
 * @beta
 *
 * @example
 * ```tsx
 * const tsdocStore = createTSDocStore({
 *  debug: true,
 *  query: async (q, params) => tsDocClient.fetch(q, params),
 *  initialState: {
 *    exports: {},
 *    member: {},
 *    package: {},
 *    packages: [],
 *    symbol: {},
 *  },
 * });
 * ```
 *
 * @example
 * ```tsx
 *  const tsdocStore = createTSDocStore({
 *    debug: true,
 *    query: async (q, params) => tsDocClient.fetch(q, params),
 * });
 * ```
 */
export function createTSDocStore(options: TSDocStoreOptions): TSDocStore {
  const {debug, query, initialState} = options

  const cache: TSDocStoreCache = initialState || {
    exports: {},
    member: {},
    package: {},
    packages: [],
    symbol: {},
  }

  return {
    exports: {
      get: async (params: {
        packageScope: string | null
        packageName: string
        releaseVersion: string
      }): Promise<TSDocExportData[] | undefined> => {
        if (debug) console.log('exports.get', params)

        const key = JSON.stringify(params)

        if (cache.exports[key]) {
          if (debug) console.log('exports.get read from cache')

          return cache.exports[key]
        }

        const result = await query(API_EXPORTS_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })

        cache.exports[key] = result

        return result
      },
    },

    member: {
      get: async (params: TSDocAppParams): Promise<TSDocAPIMember[] | null | undefined> => {
        if (debug) console.log('member.get', params)

        const key = JSON.stringify(params)

        if (cache.member[key]) {
          if (debug) console.log('member.get read from cache')

          return cache.member[key]
        }

        const result = await query(API_MEMBER_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })

        cache.member[key] = result

        return result
      },
    },

    package: {
      get: async (params: TSDocAppParams): Promise<APIPackage | null | undefined> => {
        if (debug) console.log('package.get', params)

        const key = JSON.stringify(params)

        if (cache.package[key]) {
          if (debug) console.log('package.get read from cache')

          return cache.package[key]
        }

        const result = await query(API_PACKAGE_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })

        cache.package[key] = result

        return result
      },
    },

    packages: {
      get: async (): Promise<APIPackage[] | null | undefined> => {
        if (debug) console.log('packages.get')

        if (cache.packages.length) {
          if (debug) console.log('packages.get read from cache')

          return cache.packages
        }

        const result = await query(API_PACKAGES_QUERY, {})

        cache.packages = result

        return result
      },
    },

    symbol: {
      get: async (params: {
        name: string
        packageName: string
        packageScope: string | null
      }): Promise<TSDocAPISymbol | null | undefined> => {
        if (debug) console.log('symbol.get', params)

        const key = JSON.stringify(params)

        if (cache.symbol[key]) {
          if (debug) console.log('symbol.get read from cache')

          return cache.symbol[key]
        }

        const result = await query(API_SYMBOL_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })

        cache.symbol[key] = result

        return result
      },
      search: (params: {
        query: string
        packageName: string
        packageScope: string | null
      }): Promise<TSDocSymbolSearchResult[]> => {
        if (debug) console.log('symbol.search', params)

        return query(API_SYMBOL_SEARCH_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
          query: `*${params.query}*`,
        })
      },
    },
  }
}
