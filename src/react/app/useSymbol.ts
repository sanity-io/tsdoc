import {APIMember, APISymbol} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export interface UseSymbolData extends APISymbol {
  members: APIMember[]
}

/** @beta */
export interface UseSymbolProps {
  member?: APIMember
  name: string
  packageScope?: string | null
  packageName?: string | null
}

/** @beta */
export function useSymbol(props: UseSymbolProps): {
  data?: UseSymbolData | null
  error: Error | null
  loading: boolean
} {
  const {member, name, packageName: packageNameProp, packageScope: packageScopeProp} = props
  const {params, store} = useTSDoc()
  const packageScope = packageScopeProp ?? params?.packageScope
  const packageName = packageNameProp ?? params?.packageName

  const [data, setData] = useState<UseSymbolData | null | undefined>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (member) {
      setData({
        _type: 'api.symbol',
        name,
        package: {
          _type: 'api.package',
          scope: packageScope || undefined,
          name: packageName!,
        } as any,
        members: [member],
      })

      return
    }

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
          }),
        )
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      }

      setLoading(false)
    }

    run()
  }, [member, name, packageName, packageScope, store])

  return {data, error, loading}
}
