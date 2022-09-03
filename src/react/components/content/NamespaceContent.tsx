import {APINamespace} from '@sanity/tsdoc'
import {Heading, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentDeprecatedCallout, CommentRemarks, CommentSummary} from '../comment'
import {Members} from '../members'

export function NamespaceContent(props: {data: APINamespace}): ReactElement {
  const {data} = props
  const {comment} = data

  return (
    <Stack>
      {comment && <CommentDeprecatedCallout data={comment} />}
      {comment && <CommentSummary data={comment} />}
      {comment && <CommentRemarks data={comment} />}

      <Stack marginTop={6} space={4}>
        <Heading as="h2" size={1}>
          Members
        </Heading>
        <Members data={data.members} member={data} />
      </Stack>
    </Stack>
  )
}
