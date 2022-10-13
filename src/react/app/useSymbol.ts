import {APIMember, APISymbol} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useSymbol(props: {name: string}): {
  data: (APISymbol & {members: APIMember[]}) | null
  error: Error | null
  loading: boolean
} {
  const {name} = props
  const {params, store} = useTSDoc()
  const {packageName, packageScope = null} = params || {}

  const [data, setData] = useState<(APISymbol & {members: APIMember[]}) | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!packageName) return

      try {
        setLoading(true)
        setData(null)
        setData(await store.symbol.get({packageName, packageScope, name}))
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      }

      setLoading(false)
    }

    run()
  }, [name, packageName, packageScope, store])

  return {data, error, loading}
}
