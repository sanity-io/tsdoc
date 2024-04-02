import {TSDocAPIMember, TSDocAppParams} from '@sanity/tsdoc/store'
import {useEffect, useState} from 'react'

import {useTSDoc} from './useTSDoc'

/** @beta */
export function useMember(props: {params: TSDocAppParams | null}): {
  data?: TSDocAPIMember[] | null
  error: Error | null
  loading: boolean
} {
  const {params} = props
  const {store} = useTSDoc()

  const [data, setData] = useState<TSDocAPIMember[] | undefined | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!params) return

      setLoading(true)
      setData(null)

      try {
        setData(await store.member.get(params))
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
      }

      setLoading(false)
    }

    run()
  }, [params, store])

  return {data, error, loading}
}
