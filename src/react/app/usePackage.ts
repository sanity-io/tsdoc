import type {APIPackage} from '@sanity/tsdoc'
import type {TSDocAppParams} from '@sanity/tsdoc/store'
import {useEffect, useState} from 'react'

import {useTSDoc} from './useTSDoc'

/** @beta */
export function usePackage(props: {params: TSDocAppParams | null}): {
  data: APIPackage | null | undefined
  error: Error | null
  loading: boolean
} {
  const {params} = props
  const {store} = useTSDoc()

  const [data, setData] = useState<APIPackage | null | undefined>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function run() {
      if (!params) return

      try {
        setLoading(true)
        setData(null)
        const data = await store.package.get(params)

        if (!cancelled) {
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
  }, [params, store])

  return {data, error, loading}
}
