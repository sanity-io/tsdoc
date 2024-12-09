import {Box, Container, Flex} from '@sanity/ui'

import {TSDocSymbol} from '../TSDocSymbol'
import {useTSDoc} from '../useTSDoc'

export default function SymbolStory(): React.ReactNode {
  const {params} = useTSDoc()

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={0}>
        <Flex>
          {params.memberName && (
            <TSDocSymbol border name={params.memberName} padding={2} radius={2} />
          )}
        </Flex>
      </Container>
    </Box>
  )
}
