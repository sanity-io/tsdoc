import {APIMember, Sanity} from '@sanity/tsdoc'
import groq from 'groq'
import {useEffect, useState} from 'react'
import {API_MEMBER_TYPES} from './_constants'

const EXPORTS_QUERY = groq`
  *[_type == "api.export"]{
    name,
    package->{name,scope},
    release->{version},
    "members": *[_type in $memberTypes && references(^._id)] | order(name asc) {
      "_key": _id,
      _type,
      export->{name,path},
      members[]{_key,_type,name},
      name,
      isReactComponentType
    }
  }
`

interface DataRow {
  name: string
  package: {name: string; scope: string | null}
  release: {version: string}
  members: Sanity.ArrayItem<APIMember>[]
}

export function useExports(props: {
  query: (q: string, params: Record<string, unknown>) => Promise<unknown>
}): {data: DataRow[] | null; error: Error | null} {
  const {query} = props

  const [data, setData] = useState<DataRow[] | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function run() {
      setData((await query(EXPORTS_QUERY, {memberTypes: API_MEMBER_TYPES})) as DataRow[])
    }

    run().catch(setError)
  }, [query])

  return {data, error}
}
