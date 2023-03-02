import {APINamespace} from '@sanity/tsdoc'
import {Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H} from '../../lib/ui'
import {Members} from '../members'

export function NamespaceContent(props: {
  data: APINamespace
  fontSize?: number
  level?: number
}): ReactElement {
  const {data} = props
  const {comment, members} = data

  return (
    <Stack>
      <Stack marginTop={6} space={4}>
        <H>Members</H>
        <Members data={members} member={data} />
      </Stack>

      {comment && <CommentRemarks data={comment} />}
      {comment && <CommentExampleBlocks data={comment} />}
    </Stack>
  )
}
