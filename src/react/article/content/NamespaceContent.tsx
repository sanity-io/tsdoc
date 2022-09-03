import {APINamespace} from '@sanity/tsdoc'
import {Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentDeprecatedCallout, CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H} from '../../typography'
import {Members} from '../members'

export function NamespaceContent(props: {
  data: APINamespace
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props
  const {comment} = data

  return (
    <Stack>
      {comment && <CommentDeprecatedCallout data={comment} fontSize={fontSize} />}

      <Stack marginTop={6} space={4}>
        <H level={level}>Members</H>
        <Members data={data.members} fontSize={fontSize} member={data} level={level} />
      </Stack>

      {comment && <CommentRemarks data={comment} fontSize={fontSize} level={level} />}
      {comment && <CommentExampleBlocks data={comment} fontSize={fontSize} level={level} />}
    </Stack>
  )
}
