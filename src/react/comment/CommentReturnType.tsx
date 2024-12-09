import {TSDocComment} from '@sanity/tsdoc'

import {CommentBox} from './CommentBox'
import {PortableText} from './PortableText'

export function CommentReturnType(props: {data: TSDocComment}): React.ReactNode {
  const {returns} = props.data

  if (!returns?.content) return <></>

  return (
    <CommentBox>
      <PortableText blocks={returns.content} />
    </CommentBox>
  )
}
