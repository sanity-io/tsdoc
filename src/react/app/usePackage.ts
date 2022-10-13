import {APIPackage} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {TSDocAppParams} from '../types'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function usePackage(props: {params: TSDocAppParams | null}): {
  data: APIPackage | null
  error: Error | null
  loading: boolean
} {
  const {params} = props
  const {store} = useTSDoc()

  const [data, setData] = useState<APIPackage | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!params) return

      try {
        setLoading(true)
        setData(null)
        setData(await store.package.get(params))
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
