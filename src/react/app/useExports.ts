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

  const [data, setData] = useState<TSDocExportData[] | null>(null)
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

    async function run() {
      try {
        setLoading(true)
        setData(null)
        setData(await store.exports.get(queryParams))
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      }

      setLoading(false)
    }

    run()
  }, [params.packageScope, params.packageName, params.releaseVersion, store])

  return {data, error, loading}
}
