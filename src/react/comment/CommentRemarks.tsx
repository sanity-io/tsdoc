import {TSDocComment} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {PortableText} from './PortableText'

export function CommentRemarks(props: {
  data: TSDocComment
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize, level} = props
  const {remarks} = data

  if (!remarks?.content) return <></>

  return <PortableText blocks={remarks.content} fontSize={fontSize} level={level} />
}
