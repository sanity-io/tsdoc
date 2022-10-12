import {ReactElement, ReactNode, useMemo} from 'react'
import {TSDocStore} from '../store'
import {TSDocAppParams} from '../types'
import {TSDocContext, TSDocContextValue} from './TSDocContext'

/** @beta */
export interface TSDocProviderProps {
  children: ReactNode
  onPathChange: (nextPath: string, replace?: boolean) => void
  params: TSDocAppParams | null
  path: string
  store: TSDocStore
}

/** @beta */
export function TSDocProvider(props: TSDocProviderProps): ReactElement {
  const {children, onPathChange, path, params, store} = props

  const tsdoc: TSDocContextValue = useMemo(
    () => ({onPathChange, params, path, store}),
    [onPathChange, params, path, store]
  )

  return <TSDocContext.Provider value={tsdoc}>{children}</TSDocContext.Provider>
}
