import {TSDocComment} from '@sanity/tsdoc'
import {ReactElement} from 'react'

import {CommentBox} from './CommentBox'
import {PortableText} from './PortableText'

export function CommentReturnType(props: {data: TSDocComment}): ReactElement {
  const {returns} = props.data

  if (!returns?.content) return <></>

  return (
    <CommentBox>
      <PortableText blocks={returns.content} />
    </CommentBox>
  )
}
