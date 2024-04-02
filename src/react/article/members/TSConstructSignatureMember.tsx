import {APIConstructSignature} from '@sanity/tsdoc'
import {Box, Card, Code, Flex} from '@sanity/ui'
import {ReactElement} from 'react'

import {CommentBox, CommentSummary} from '../../comment'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSConstructSignatureMember(props: {
  data: APIMemberWithInheritance<APIConstructSignature>
}): ReactElement {
  const {data} = props
  const {comment, inheritedFrom, releaseTag} = data

  return (
    <Card border overflow="auto" radius={3}>
      <Flex align="flex-start" gap={1} padding={3}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} />

        <Box flex="none">
          <Code as="h3" language="ts">
            TODO: TSConstructSignatureMember
          </Code>
        </Box>
      </Flex>

      {comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={comment} />
        </CommentBox>
      )}

      {inheritedFrom && (
        <Box marginTop={3}>
          <MemberInheritedFrom data={inheritedFrom} />
        </Box>
      )}
    </Card>
  )
}
