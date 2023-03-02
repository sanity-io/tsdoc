import {TSDocComment} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {PortableText} from './PortableText'

export function CommentSummary(props: {data: TSDocComment}): ReactElement {
  const {summary} = props.data

  if (!summary) return <></>

  return <PortableText blocks={summary} />
}
