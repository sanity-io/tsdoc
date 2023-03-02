import {APIProperty} from '@sanity/tsdoc'
import {Box, Card, Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {ReleaseBadge} from '../../components/ReleaseBadge'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'

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
  } = data

  return (
    <Card border overflow="hidden" radius={3} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex align="flex-start" gap={1} padding={2}>
        {data.releaseTag && data.releaseTag !== 'public' && (
          <Box flex="none">
            <ReleaseBadge releaseTag={data.releaseTag} />
          </Box>
        )}

        <Box flex={1} padding={1}>
          <TSDocCode
            prefix={`${isStatic ? 'static ' : ''}${name}${isOptional ? '?' : ''}: `}
            tokens={type}
          />
        </Box>
      </Flex>

      {comment && (
        <CommentBox padding={3}>
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
