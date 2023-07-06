import {APIPropertySignature} from '@sanity/tsdoc'
import {Box, Card, Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {Size} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSPropertySignatureMember(props: {
  data: APIMemberWithInheritance<APIPropertySignature>
}): ReactElement {
  const {data} = props
  const {comment, inheritedFrom, isOptional, name, type, releaseTag} = data

  return (
    <Card border overflow="auto" padding={4} radius={3} tone="inherit">
      <Flex align="flex-start" gap={1}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} hidePublicTag />
        <Box flex="none">
          <TSDocCode deindent prefix={`${name}${isOptional ? '?' : ''}: `} tokens={type} />
        </Box>
      </Flex>

      {comment?.summary && (
        <Size delta={-1}>
          <CommentBox paddingTop={3}>
            {/* TODO: CommentDeprecatedCallout */}
            <CommentSummary data={comment} />
            {/* TODO: CommentRemarks */}
            {/* TODO: CommentExampleBlocks */}
          </CommentBox>
        </Size>
      )}

      {inheritedFrom && (
        <Card borderTop marginTop={3} paddingTop={3} tone="inherit">
          <MemberInheritedFrom data={inheritedFrom} />
        </Card>
      )}
    </Card>
  )
}
