import {TSDocStore} from '@sanity/tsdoc/store'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {createContext} from 'react'

/** @beta */
export interface TSDocContextValue {
  basePath: string
  path: string
  params: TSDocAppParams
  updateParams: (fn: (params: TSDocAppParams) => TSDocAppParams) => void
  onPathChange: (nextPath: string, replace?: boolean) => void
  store: TSDocStore
}

export const TSDocContext = createContext<TSDocContextValue | null>(null)
