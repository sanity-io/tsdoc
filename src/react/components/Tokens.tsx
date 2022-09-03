import {APIToken, Sanity} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {ApiToken} from './ApiToken'

export function Tokens(props: {
  data: Sanity.ArrayItem<APIToken>[]
  deindent?: boolean
  prefix?: string
  suffix?: string
}): ReactElement {
  const {data, deindent, prefix, suffix} = props

  return (
    <>
      {prefix}
      {data?.map((t) => (
        <ApiToken deindent={deindent} key={t._key} token={t} />
      ))}
      {suffix}
    </>
  )
}
