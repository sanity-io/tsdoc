/* eslint-disable no-console */
import {APIPackage} from '@sanity/tsdoc'
import {API_MEMBER_TYPES} from './constants'
import {
  API_EXPORTS_QUERY,
  API_MEMBER_QUERY,
  API_PACKAGE_QUERY,
  API_SYMBOL_SEARCH_QUERY,
  API_SYMBOL_QUERY,
  API_PACKAGES_QUERY,
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
 * A factory function for creating a TSDocStore instance.
 *
 * @beta
 *
 * @example
 * ```tsx
 * const tsdocStore = new createTSDocStore({
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
 *  const tsdocStore = new createTSDocStore({
 *    debug: true,
 *    query: async (q, params) => tsDocClient.fetch(q, params),
 * });
 * ```
 */
export class createTSDocStore implements TSDocStore {
  /**
   * Whether or not debug mode is enabled.
   */
  debug?: boolean

  /**
   * A function for querying the TSDocStore.
   *
   * @param q - The query string.
   * @param params - An object containing query parameters.
   * @returns A Promise that resolves to the query results.
   */
  query: (q: string, params: Record<string, unknown>) => Promise<any>

  /**
   * The cache used by the TSDocStore.
   */
  cache: TSDocStoreCache = {
    exports: {},
    member: {},
    package: {},
    packages: [],
    symbol: {},
  }

  constructor(options: TSDocStoreOptions) {
    const {debug, query, initialState} = options

    this.debug = debug
    this.query = query
    this.cache = initialState || this.cache
  }

  exports = {
    get: async (params: {
      packageScope: string | null
      packageName: string
      releaseVersion: string
    }): Promise<TSDocExportData[] | undefined> => {
      if (this.debug) console.log('exports.get', params)

      const key = JSON.stringify(params)

      if (this.cache.exports[key]) {
        if (this.debug) console.log('exports.get read from cache')

        return this.cache.exports[key]
      }

      const result = await this.query(API_EXPORTS_QUERY, {
        ...params,
        memberTypes: API_MEMBER_TYPES,
      })

      this.cache.exports[key] = result

      return result
    },
  }

  member = {
    get: async (params: TSDocAppParams): Promise<TSDocAPIMember | null | undefined> => {
      if (this.debug) console.log('member.get', params)

      const key = JSON.stringify(params)

      if (this.cache.member[key]) {
        if (this.debug) console.log('member.get read from cache')

        return this.cache.member[key]
      }

      const result = await this.query(API_MEMBER_QUERY, {
        ...params,
        memberTypes: API_MEMBER_TYPES,
      })

      this.cache.member[key] = result

      return result
    },
  }

  package = {
    get: async (params: TSDocAppParams): Promise<APIPackage | null | undefined> => {
      if (this.debug) console.log('package.get', params)

      const key = JSON.stringify(params)

      if (this.cache.package[key]) {
        if (this.debug) console.log('package.get read from cache')

        return this.cache.package[key]
      }

      const result = await this.query(API_PACKAGE_QUERY, {
        ...params,
        memberTypes: API_MEMBER_TYPES,
      })

      this.cache.package[key] = result

      return result
    },
  }

  packages = {
    get: async (): Promise<APIPackage[] | null | undefined> => {
      if (this.debug) console.log('packages.get')

      if (this.cache.packages.length) {
        if (this.debug) console.log('packages.get read from cache')

        return this.cache.packages
      }

      const result = await this.query(API_PACKAGES_QUERY, {})

      this.cache.packages = result

      return result
    },
  }

  symbol = {
    get: async (params: {
      name: string
      packageName: string
      packageScope: string | null
    }): Promise<TSDocAPISymbol | null | undefined> => {
      if (this.debug) console.log('symbol.get', params)

      const key = JSON.stringify(params)

      if (this.cache.symbol[key]) {
        if (this.debug) console.log('symbol.get read from cache')

        return this.cache.symbol[key]
      }

      const result = await this.query(API_SYMBOL_QUERY, {
        ...params,
        memberTypes: API_MEMBER_TYPES,
      })

      this.cache.symbol[key] = result

      return result
    },
    search: (params: {
      query: string
      packageName: string
      packageScope: string | null
    }): Promise<TSDocSymbolSearchResult[]> => {
      if (this.debug) console.log('symbol.search', params)

      return this.query(API_SYMBOL_SEARCH_QUERY, {
        ...params,
        memberTypes: API_MEMBER_TYPES,
        query: `*${params.query}*`,
      })
    },
  }
}
