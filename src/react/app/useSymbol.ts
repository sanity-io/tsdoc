import {APIMember, APISymbol} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useSymbol(props: {name: string}): {
  data: (APISymbol & {members: APIMember[]}) | null
  error: Error | null
} {
  const {name} = props
  const {params, store} = useTSDoc()
  const {packageName, packageScope = null} = params || {}
  const [data, setData] = useState<(APISymbol & {members: APIMember[]}) | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!packageName) return

    store.symbol.get({packageName, packageScope, name}).then(setData).catch(setError)
  }, [name, packageName, packageScope, store])

  return {data, error}
}
