import {APIPackage} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function usePackages(): {
  data: APIPackage[] | null
  error: Error | null
  loading: boolean
} {
  const {store} = useTSDoc()
  const [data, setData] = useState<APIPackage[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      try {
        setLoading(true)
        setData(null)
        setData(await store.packages.get())
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      }

      setLoading(false)
    }

    run()
  }, [store])

  return {data, error, loading}
}
