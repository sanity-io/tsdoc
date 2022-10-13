import {APISymbol} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useSymbolSearch(props: {query: string | null}): {
  data: (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
  error: Error | null
  loading: boolean
} {
  const {query} = props
  const {store} = useTSDoc()

  const [data, setData] = useState<
    (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
  >([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!query) {
        setData([])

        return
      }

      try {
        setLoading(true)
        setData(await store.symbol.search(query))
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      }

      setLoading(false)
    }

    run()
  }, [query, store])

  return {data, error, loading}
}
