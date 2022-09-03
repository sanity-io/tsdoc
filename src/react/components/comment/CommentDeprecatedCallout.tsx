import {WarningOutlineIcon} from '@sanity/icons'
import {TSDoc} from '@sanity/tsdoc'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentContent} from './CommentContent'

export function CommentDeprecatedCallout(props: {
  data: TSDoc.Comment
  fontSize?: number
}): ReactElement {
  const {data, fontSize = 2} = props
  const {deprecated} = data

  if (!deprecated?.content) return <></>

  return (
    <Flex>
      <Box marginRight={3}>
        <Text size={fontSize}>
          <WarningOutlineIcon />
        </Text>
      </Box>
      <Stack flex={1} space={2}>
        <Box>
          <Text as="h2" size={fontSize} weight="semibold">
            Deprecated
          </Text>
        </Box>
        <CommentContent blocks={deprecated.content} fontSize={fontSize} />
      </Stack>
    </Flex>
  )
}
