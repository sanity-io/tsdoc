import {TSDocComment} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {PortableText} from './PortableText'

export function CommentReturnType(props: {data: TSDocComment}): ReactElement {
  const {returns} = props.data

  if (!returns?.content) return <></>

  return <PortableText blocks={returns.content} />
}
