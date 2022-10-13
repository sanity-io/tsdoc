import {APIToken, SanityArrayItem} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {ApiToken} from './ApiToken'

export function CodeSnippet(props: {
  data: SanityArrayItem<APIToken>[]
  deindent?: boolean
  fontSize?: number
  prefix?: string
  suffix?: string
}): ReactElement {
  const {data, deindent, fontSize, prefix, suffix} = props

  return (
    <>
      {prefix}
      {data?.map((t) => (
        <ApiToken deindent={deindent} fontSize={fontSize} key={t._key} token={t} />
      ))}
      {suffix}
    </>
  )
}
