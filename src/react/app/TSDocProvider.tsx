import {ReactElement, ReactNode, useMemo} from 'react'
import {TSDocStore} from '../store'
import {TSDocAppParams} from '../types'
import {TSDocContext, TSDocContextValue} from './TSDocContext'

/** @beta */
export interface TSDocProviderProps {
  basePath?: string
  children: ReactNode
  onPathChange: (nextPath: string, replace?: boolean) => void
  params: TSDocAppParams | null
  path: string
  store: TSDocStore
}

/** @beta */
export function TSDocProvider(props: TSDocProviderProps): ReactElement {
  const {basePath = '', children, onPathChange, path: fullPath, params, store} = props

  const path = _consumeBasePath(basePath, fullPath)

  const tsdoc: TSDocContextValue = useMemo(
    () => ({basePath, onPathChange, params, path, store}),
    [basePath, onPathChange, params, path, store]
  )

  return <TSDocContext.Provider value={tsdoc}>{children}</TSDocContext.Provider>
}

function _consumeBasePath(basePath: string, fullPath: string) {
  if (basePath === fullPath) return '/'

  if (!fullPath.startsWith(basePath)) {
    return '/'
  }

  return fullPath.slice(basePath.length)
}
