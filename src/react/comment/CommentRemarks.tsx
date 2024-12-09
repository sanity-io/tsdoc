import {TSDocComment} from '@sanity/tsdoc'

import {H} from '../lib/ui'
import {PortableText} from './PortableText'

export function CommentRemarks(props: {data: TSDocComment}): React.ReactNode {
  const {data} = props
  const {remarks} = data

  if (!remarks?.content) return <></>

  return (
    <>
      <H size={[-1, 0, 1, 2]}>Remarks</H>
      <PortableText blocks={remarks.content} />
    </>
  )
}
