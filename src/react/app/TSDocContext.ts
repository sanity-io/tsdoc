import {createContext} from 'react'
import {TSDocStore} from '../store'
import {TSDocAppParams} from '../types'

/** @beta */
export interface TSDocContextValue {
  path: string
  params: TSDocAppParams | null
  onPathChange: (nextPath: string, replace?: boolean) => void
  store: TSDocStore
}

export const TSDocContext = createContext<TSDocContextValue | null>(null)
