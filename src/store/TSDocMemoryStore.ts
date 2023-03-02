/* eslint-disable no-console */

import {APIDocument} from '@sanity/tsdoc'
import {parse, evaluate} from 'groq-js'
import {createTSDocStore} from './TSDocStore'
import {TSDocStore} from './types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const DEBUG = false

/** @beta */
export function createTSDocMemoryStore({docs}: {docs: APIDocument[]}): TSDocStore {
  const query = async (q: string, params: Record<string, unknown>) => {
    await delay(0)

    const tree = parse(q)

    const queryId = String(Math.random())

    if (DEBUG) console.time(`query:${queryId}`)

    const value = await evaluate(tree, {
      dataset: docs,
      params,
    })

    if (DEBUG) console.timeEnd(`query:${queryId}`)

    return await value.get()
  }

  return createTSDocStore({debug: DEBUG, query})
}
