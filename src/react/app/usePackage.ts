import {APIPackage} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {TSDocAppParams} from '../types'
import {useTSDoc} from './useTSDoc'

/** @public */
export function usePackage(props: {params: TSDocAppParams | null}): {
  data: APIPackage | null
  error: Error | null
} {
  const {params} = props
  const {store} = useTSDoc()

  const [data, setData] = useState<APIPackage | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!params) return
    store.package.get(params).then(setData, setError)
  }, [params, store])

  return {data, error}
}
