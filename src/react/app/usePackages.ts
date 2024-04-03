import type {APIPackage} from '@sanity/tsdoc'
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        setData(null)
        const data = await store.packages.get()

        if (!cancelled) {
          // @ts-expect-error - find a way to fix this
          setData(data)
        }
      } catch (err) {
        if (err instanceof Error && !cancelled) {
          setError(err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [store])

  return {data, error, loading}
}
