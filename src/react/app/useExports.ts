import {useEffect, useState} from 'react'
import {TSDocExportData} from '../types'
import {useTSDoc} from './useTSDoc'

/** @public */
export function useExports(): {data: TSDocExportData[] | null; error: Error | null} {
  const {store} = useTSDoc()

  const [data, setData] = useState<TSDocExportData[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function run() {
      setData(await store.exports.get())
    }

    run().catch(setError)
  }, [store])

  return {data, error}
}
