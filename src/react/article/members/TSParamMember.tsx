import {APIParameter} from '@sanity/tsdoc'
import {Card, Flex, Box, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentSummary} from '../../comment'
import {useSpace} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSParamMember(props: {data: APIParameter}): ReactElement {
  const {data} = props
  const {comment, name, type, releaseTag, isOptional} = data
  const codePrefix = `${name}${isOptional ? '?' : ''}: `

  return (
    <Stack marginTop={useSpace([1, 1, 3])} space={useSpace([1, 2, 3])}>
      <Card
        border
        overflow="hidden"
        padding={4}
        radius={3}
        tone={comment?.deprecated ? 'critical' : 'inherit'}
      >
        <Stack space={4}>
          <Flex align="flex-start" gap={1}>
            <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} hidePublicTag />

            <Box flex={1}>
              <TSDocCode prefix={codePrefix} tokens={type} />
            </Box>
          </Flex>

          {comment && <CommentSummary data={comment} />}
        </Stack>
      </Card>
    </Stack>
  )
}
