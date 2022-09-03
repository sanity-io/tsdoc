import {useContext} from 'react'
import {TSDocContext, TSDocContextValue} from './TSDocContext'

export function useTSDoc(): TSDocContextValue {
  const tsdoc = useContext(TSDocContext)

  if (!tsdoc) throw new Error('TSDoc: missing context value')

  return tsdoc
}
