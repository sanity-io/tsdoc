import {TSDoc} from '@sanity/tsdoc'
import {Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentContent} from './CommentContent'

export function CommentRemarks(props: {data: TSDoc.Comment; fontSize?: number}): ReactElement {
  const {data, fontSize = 2} = props
  const {remarks} = data

  if (!remarks?.content) return <></>

  return (
    <Stack space={4}>
      {/* <Heading size={[fontSize - 2, fontSize - 2, fontSize - 1]}>Remarks</Heading> */}
      <CommentContent blocks={remarks.content} fontSize={fontSize} />
    </Stack>
  )
}
