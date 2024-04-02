import {APISymbol} from '@sanity/tsdoc'
import {useEffect, useRef, useState} from 'react'

import {useTSDoc} from './useTSDoc'

const DEBOUNCE_MS = 150

/** @beta */
export function useSymbolSearch(props: {query: string | null}): {
  data: (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
  error: Error | null
  loading: boolean
} {
  const {query} = props
  const {params, store} = useTSDoc()

  const [data, setData] = useState<
    (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
  >([])
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function run() {
      if (!debouncedQuery || !params.packageName) {
        setData([])

        return
      }

      try {
        setLoading(true)
        setData(
          await store.symbol.search({
            query: debouncedQuery,
            packageName: params.packageName,
            packageScope: params.packageScope,
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
  }, [debouncedQuery, params.packageName, params.packageScope, store])

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedQuery(query)
      timeoutRef.current = null
    }, DEBOUNCE_MS)
  }, [query])

  return {data, error, loading}
}
