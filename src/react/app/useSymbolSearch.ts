import {APISymbol} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useSymbolSearch(props: {query: string | null}): {
  data: (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
} {
  const {query} = props
  const {store} = useTSDoc()
  const [data, setData] = useState<
    (APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]})[]
  >([])

  useEffect(() => {
    if (!query) {
      setData([])

      return
    }

    store.symbol.search(query).then(setData)
  }, [query, store])

  return {data}
}
