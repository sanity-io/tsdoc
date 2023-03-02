import {APIMember, APISymbol} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export interface UseSymbolProps {
  name: string
  packageScope?: string | null
  packageName?: string
  releaseVersion?: string
}

/** @beta */
export function useSymbol(props: UseSymbolProps): {
  data: (APISymbol & {members: APIMember[]}) | null
  error: Error | null
  loading: boolean
} {
  const {name, packageName: packageNameProp, packageScope: packageScopeProp} = props
  const {params, store} = useTSDoc()
  const packageScope = packageScopeProp ?? params?.packageScope
  const packageName = packageNameProp ?? params?.packageName

  const [data, setData] = useState<(APISymbol & {members: APIMember[]}) | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!packageName) return

      try {
        setLoading(true)
        setData(null)
        setData(
          await store.symbol.get({
            packageName,
            packageScope,
            name,
          })
        )
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
