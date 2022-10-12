import {APIDocument} from '@sanity/tsdoc'
import {parse, evaluate} from 'groq-js'
import {API_MEMBER_TYPES} from './constants'
import {
  EXPORTS_QUERY,
  MEMBER_QUERY,
  PACKAGE_QUERY,
  SYMBOL_SEARCH_QUERY,
  SYMBOL_QUERY,
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

        return query(EXPORTS_QUERY, {memberTypes: API_MEMBER_TYPES})
      },
    },

    member: {
      async get(params) {
        await delay(0)

        return query(MEMBER_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })
      },
    },

    package: {
      async get(params) {
        await delay(0)

        return query(PACKAGE_QUERY, {
          ...params,
          memberTypes: API_MEMBER_TYPES,
        })
      },
    },

    symbol: {
      async get(options) {
        return query(SYMBOL_QUERY, {
          ...options,
          memberTypes: API_MEMBER_TYPES,
        })
      },

      async search(q) {
        await delay(0)

        return query(SYMBOL_SEARCH_QUERY, {
          memberTypes: API_MEMBER_TYPES,
          query: `*${q}*`,
        })
      },
    },
  }
}
