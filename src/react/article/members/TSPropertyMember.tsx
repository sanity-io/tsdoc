import {APIProperty} from '@sanity/tsdoc'
import {Box, Card, Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSPropertyMember(props: {
  data: APIMemberWithInheritance<APIProperty>
}): ReactElement {
  const {data} = props
  const {
    comment,
    inheritedFrom,
    isEventProperty: _isEventProperty,
    isOptional,
    isStatic,
    name,
    type,
    releaseTag,
  } = data

  return (
    <Card
      border
      overflow="hidden"
      radius={3}
      padding={4}
      tone={comment?.deprecated ? 'critical' : 'inherit'}
    >
      <Flex align="flex-start" gap={1}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} hidePublicTag />

        <Box flex={1} paddingBottom={4}>
          <TSDocCode
            prefix={`${isStatic ? 'static ' : ''}${name}${isOptional ? '?' : ''}: `}
            tokens={type}
          />
        </Box>
      </Flex>

      {comment && (
        <CommentBox>
          <CommentSummary data={comment} />
        </CommentBox>
      )}

      {inheritedFrom && (
        <Card borderTop padding={3} tone="inherit">
          <MemberInheritedFrom data={inheritedFrom} />
        </Card>
      )}
    </Card>
  )
}
