import {APIPropertySignature} from '@sanity/tsdoc'
import {Box, Card, Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {ReleaseBadge} from '../../components/ReleaseBadge'
import {Size} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'

export function TSPropertySignatureMember(props: {
  data: APIMemberWithInheritance<APIPropertySignature>
}): ReactElement {
  const {data} = props
  const {comment, inheritedFrom, isOptional, name, type} = data

  return (
    <Card border overflow="auto" radius={3} tone="inherit">
      <Flex align="flex-start" gap={1} padding={2}>
        {data.releaseTag && data.releaseTag !== 'public' && (
          <Box flex="none">
            <ReleaseBadge releaseTag={data.releaseTag} />
          </Box>
        )}

        <Box flex="none" padding={1}>
          <TSDocCode deindent prefix={`${name}${isOptional ? '?' : ''}: `} tokens={type} />
        </Box>
      </Flex>

      {comment?.summary && (
        <Size delta={-1}>
          <CommentBox padding={3}>
            {/* TODO: CommentDeprecatedCallout */}
            <CommentSummary data={comment} />
            {/* TODO: CommentRemarks */}
            {/* TODO: CommentExampleBlocks */}
          </CommentBox>
        </Size>
      )}

      {inheritedFrom && (
        <Card borderTop padding={3} tone="inherit">
          <MemberInheritedFrom data={inheritedFrom} />
        </Card>
      )}
    </Card>
  )
}
