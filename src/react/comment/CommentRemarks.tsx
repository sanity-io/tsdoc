import {TSDocComment} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {PortableText} from './PortableText'

export function CommentRemarks(props: {data: TSDocComment}): ReactElement {
  const {data} = props
  const {remarks} = data

  if (!remarks?.content) return <></>

  return <PortableText blocks={remarks.content} />
}
