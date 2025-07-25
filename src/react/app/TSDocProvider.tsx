import {TSDocAppParams, TSDocStore} from '@sanity/tsdoc/store'
import {useCallback, useEffect, useMemo, useRef} from 'react'
import {registerLanguage} from 'react-refractor'
import bash from 'refractor/bash'
import javascript from 'refractor/javascript'
import json from 'refractor/json'
import jsx from 'refractor/jsx'
import typescript from 'refractor/typescript'

import {compilePath} from './lib/compilePath'
import {TSDocContext, TSDocContextValue} from './TSDocContext'

registerLanguage(bash)
registerLanguage(javascript)
registerLanguage(json)
registerLanguage(jsx)
registerLanguage(typescript)

const EMPTY_PARAMS: TSDocAppParams = {
  exportPath: null,
  memberName: null,
  packageName: null,
  packageScope: null,
  releaseVersion: null,
}

/** @beta */
export interface TSDocProviderProps {
  basePath?: string
  children: React.ReactNode
  onPathChange: (nextPath: string, replace?: boolean) => void
  params?: TSDocAppParams
  path: string
  store: TSDocStore
}

/** @beta */
export function TSDocProvider(props: TSDocProviderProps): React.ReactNode {
  const {
    basePath = '',
    children,
    onPathChange,
    path: fullPath,
    params = EMPTY_PARAMS,
    store,
  } = props

  const path = _consumeBasePath(basePath, fullPath)

  const paramsRef = useRef(params)

  const updateParams = useCallback(
    (fn: (params: TSDocAppParams) => TSDocAppParams) => {
      const nextParams = fn(paramsRef.current || EMPTY_PARAMS)

      paramsRef.current = nextParams

      const nextPath = compilePath(nextParams)

      onPathChange(nextPath)
    },
    [onPathChange],
  )

  const tsdoc: TSDocContextValue = useMemo(
    () => ({basePath, onPathChange, params, path, store, updateParams}),
    [basePath, onPathChange, params, path, store, updateParams],
  )

  useEffect(() => {
    paramsRef.current = params
  }, [params])

  return <TSDocContext.Provider value={tsdoc}>{children}</TSDocContext.Provider>
}

function _consumeBasePath(basePath: string, fullPath: string) {
  if (basePath === fullPath) return '/'

  if (!fullPath.startsWith(basePath)) {
    return '/'
  }

  return fullPath.slice(basePath.length)
}
