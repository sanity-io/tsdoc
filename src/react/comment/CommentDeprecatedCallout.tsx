import {WarningOutlineIcon} from '@sanity/icons'
import {TSDocComment} from '@sanity/tsdoc'
import {Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {Size, useTextSize} from '../lib/ui'
import {CommentBox} from './CommentBox'
import {PortableText} from './PortableText'

export function CommentDeprecatedCallout(props: {data: TSDocComment}): ReactElement {
  const {data} = props
  const {deprecated} = data
  const textSize = useTextSize([0, 0, 1])

  if (!deprecated?.content) return <></>

  return (
    <Card padding={4} radius={3} shadow={1} tone="critical">
      <Flex align="flex-start">
        <Box flex="none" marginRight={3}>
          <Text size={textSize}>
            <WarningOutlineIcon />
          </Text>
        </Box>
        <Stack flex={1} space={2}>
          <CommentBox>
            <Text size={textSize} weight="semibold">
              Deprecated
            </Text>
            <Size delta={-1}>
              <PortableText blocks={deprecated.content} />
            </Size>
          </CommentBox>
        </Stack>
      </Flex>
    </Card>
  )
}
