import {Stack, Card, Flex, Text, Box} from '@sanity/ui'
import {ReactElement} from 'react'
import {TSDocParamBlock} from '../../../core'
import {CommentBox} from '../../comment'
import {PortableText} from '../../comment/PortableText'
import {useSpace, useTextSize} from '../../lib/ui'

export function TSVariableParamMember(props: {data: TSDocParamBlock}): ReactElement {
  const {data} = props
  const {content, name} = data

  const textSize = useTextSize([-1, -1, 0])

  return (
    <Stack marginTop={useSpace([1, 1, 3])} space={useSpace([1, 2, 3])}>
      <Card border overflow="hidden" radius={3} padding={4}>
        <Box paddingBottom={4}>
          <Text size={textSize} muted weight="semibold">
            {name}
          </Text>
        </Box>

        {content && (
          <CommentBox>
            <PortableText blocks={content} />
          </CommentBox>
        )}
      </Card>
    </Stack>
  )
}
