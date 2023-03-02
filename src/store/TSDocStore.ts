/* eslint-disable no-console */

import {API_MEMBER_TYPES} from './constants'
import {
  API_EXPORTS_QUERY,
  API_MEMBER_QUERY,
  API_PACKAGE_QUERY,
  API_SYMBOL_SEARCH_QUERY,
  API_SYMBOL_QUERY,
  API_PACKAGES_QUERY,
} from './queries'
import {TSDocStore} from './types'

/** @beta */
export interface TSDocStoreOptions {
  debug?: boolean
  query: (q: string, params: Record<string, unknown>) => Promise<any>
}

/** @beta */
export function createTSDocStore(options: TSDocStoreOptions): TSDocStore {
  const {debug, query} = options

  return {
    exports: {
      get: (params) => {
        if (debug) console.log('exports.get', params)

        return query(API_EXPORTS_QUERY, {...params, memberTypes: API_MEMBER_TYPES})
      },
    },

    member: {
      get: (params) => {
        if (debug) console.log('member.get', params)

        return query(API_MEMBER_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })
      },
    },

    package: {
      get: (params) => {
        if (debug) console.log('package.get', params)

        return query(API_PACKAGE_QUERY, {...params, memberTypes: API_MEMBER_TYPES})
      },
    },

    packages: {
      get: () => {
        if (debug) console.log('packages.get')

        return query(API_PACKAGES_QUERY, {})
      },
    },

    symbol: {
      get: (params) => {
        if (debug) console.log('symbol.get', params)

        return query(API_SYMBOL_QUERY, {...params, memberTypes: API_MEMBER_TYPES})
      },

      search: (params) => {
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
