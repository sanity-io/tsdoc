import {WarningOutlineIcon} from '@sanity/icons'
import {TSDocComment} from '@sanity/tsdoc'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {_fontSize} from '../helpers'
import {H} from '../typography'
import {PortableText} from './PortableText'

export function CommentDeprecatedCallout(props: {
  data: TSDocComment
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props
  const {deprecated} = data

  if (!deprecated?.content) return <></>

  return (
    <Flex>
      <Box flex="none" marginRight={3}>
        <Text size={_fontSize(fontSize, [0, 0, 1])}>
          <WarningOutlineIcon />
        </Text>
      </Box>
      <Stack flex={1} space={2}>
        <H fontSize={fontSize} level={level}>
          Deprecated
        </H>
        <PortableText blocks={deprecated.content} fontSize={fontSize} />
      </Stack>
    </Flex>
  )
}
