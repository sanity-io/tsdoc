import {TSDocExportData} from '@sanity/tsdoc/store'
import {useEffect, useState} from 'react'

import {useTSDoc} from './useTSDoc'

/** @beta */
export function useExports(): {
  data: TSDocExportData[] | null
  error: Error | null
  loading: boolean
} {
  const {params, store} = useTSDoc()

  const [data, setData] = useState<TSDocExportData[] | undefined | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!params.packageName || !params.releaseVersion) {
      setData(null)

      return
    }

    const queryParams = {
      packageScope: params.packageScope,
      packageName: params.packageName,
      releaseVersion: params.releaseVersion,
    }
    let cancelled = false

    async function run() {
      try {
        setLoading(true)
        setData(null)
        const data = await store.exports.get(queryParams)

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
  }, [params.packageScope, params.packageName, params.releaseVersion, store])

  // @ts-expect-error - find a way to fix this
  return {data, error, loading}
}
