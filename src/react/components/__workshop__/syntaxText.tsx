import {Box, Text} from '@sanity/ui'

import {SyntaxText} from '../ColoredCode'

export default function SyntaxTextStory(): React.ReactNode {
  return (
    <Box padding={4}>
      <Text>
        <SyntaxText $syntax="string">{`string`}</SyntaxText>
      </Text>
    </Box>
  )
}
