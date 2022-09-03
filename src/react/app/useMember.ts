import {APIMember} from '@sanity/tsdoc'
import {useEffect, useState} from 'react'
import {TSDocAppParams} from '../types'
import {useTSDoc} from './useTSDoc'

/** @public */
export function useMember(props: {params: TSDocAppParams | null}): {
  data: APIMember | null
  error: Error | null
} {
  const {params} = props
  const {store} = useTSDoc()

  const [data, setData] = useState<APIMember | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!params) {
      return
    }

    store.member.get(params).then(setData, setError)
  }, [params, store])

  return {data, error}
}
