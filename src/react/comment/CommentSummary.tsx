import {TSDocComment} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {PortableText} from './PortableText'

export function CommentSummary(props: {
  data: TSDocComment
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize, level} = props
  const {summary} = data

  if (!summary) return <></>

  return <PortableText blocks={summary} fontSize={fontSize} level={level} />
}
