import {APIParameter} from '@sanity/tsdoc'
import {Card, Flex, Box, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {ReleaseBadge} from '../../components/ReleaseBadge'
import {useSpace} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'

export function TSParamMember(props: {data: APIParameter}): ReactElement {
  const {data} = props
  const {comment, name, type, releaseTag, isOptional} = data
  const codePrefix = `${name}${isOptional ? '?' : ''}: `

  return (
    <Stack marginTop={useSpace([1, 1, 3])} space={useSpace([1, 2, 3])}>
      <Card border overflow="hidden" radius={3} tone={comment?.deprecated ? 'critical' : 'inherit'}>
        <Flex align="flex-start" gap={1} padding={2}>
          {releaseTag && releaseTag !== 'public' && (
            <Box flex="none">
              <ReleaseBadge releaseTag={releaseTag} />
            </Box>
          )}

          <Box flex={1} padding={1}>
            <TSDocCode prefix={codePrefix} tokens={type} />
          </Box>
        </Flex>

        {comment && (
          <CommentBox padding={3}>
            <CommentSummary data={comment} />
          </CommentBox>
        )}
      </Card>
    </Stack>
  )
}
