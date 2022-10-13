import {APIDocument} from '@sanity/tsdoc'
import {parse, evaluate} from 'groq-js'
import {API_MEMBER_TYPES} from './constants'
import {
  API_EXPORTS_QUERY,
  API_MEMBER_QUERY,
  API_PACKAGE_QUERY,
  API_SYMBOL_SEARCH_QUERY,
  API_SYMBOL_QUERY,
} from './queries'
import {TSDocStore} from './types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/** @beta */
export function createTSDocMemoryStore({docs}: {docs: APIDocument[]}): TSDocStore {
  const query = async (q: string, params: Record<string, unknown>) => {
    const tree = parse(q)

    const value = await evaluate(tree, {
      dataset: docs,
      params,
    })

    return await value.get()
  }

  return {
    exports: {
      async get() {
        await delay(0)

        return query(API_EXPORTS_QUERY, {memberTypes: API_MEMBER_TYPES})
      },
    },

    member: {
      async get(params) {
        await delay(0)

        return query(API_MEMBER_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })
      },
    },

    package: {
      async get(params) {
        await delay(0)

        return query(API_PACKAGE_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })
      },
    },

    symbol: {
      async get(options) {
        return query(API_SYMBOL_QUERY, {
          ...options,
          memberTypes: API_MEMBER_TYPES,
        })
      },

      async search(q) {
        await delay(0)

        return query(API_SYMBOL_SEARCH_QUERY, {
          memberTypes: API_MEMBER_TYPES,
          query: `*${q}*`,
        })
      },
    },
  }
}
