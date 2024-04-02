import {APIToken, SanityArrayItem} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {ApiToken} from './ApiToken'

export function CodeSnippet(props: {
  data: SanityArrayItem<APIToken>[]
  deindent?: boolean
  prefix?: string
  suffix?: string
}): ReactElement {
  const {data, deindent, prefix, suffix} = props

  return (
    <>
      {prefix}
      {data?.map((t) => <ApiToken deindent={deindent} key={t._key} token={t} />)}
      {suffix}
    </>
  )
}
