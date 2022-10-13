import {useEffect, useState} from 'react'
import {TSDocExportData} from '../types'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useExports(): {
  data: TSDocExportData[] | null
  error: Error | null
  loading: boolean
} {
  const {store} = useTSDoc()

  const [data, setData] = useState<TSDocExportData[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      try {
        setLoading(true)
        setData(null)
        setData(await store.exports.get())
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
