import {TSDocComment} from '@sanity/tsdoc'

import {PortableText} from './PortableText'

export function CommentSummary(props: {data: TSDocComment}): React.ReactNode {
  const {summary} = props.data

  if (!summary) return <></>

  return <PortableText blocks={summary} />
}
