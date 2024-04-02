import {Box, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {SyntaxText} from '../ColoredCode'

export default function SyntaxTextStory(): ReactElement {
  return (
    <Box padding={4}>
      <Text>
        <SyntaxText $syntax="string">{`string`}</SyntaxText>
      </Text>
    </Box>
  )
}
