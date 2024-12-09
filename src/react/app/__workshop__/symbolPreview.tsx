import {Box, Container, Flex} from '@sanity/ui'

import {TSDocSymbolPreview} from '../TSDocSymbolPreview'
import {useTSDoc} from '../useTSDoc'

export default function SymbolPreviewStory(): React.ReactNode {
  const {params} = useTSDoc()

  return (
    <Box padding={[4, 5, 6]}>
      <Container width={1}>
        <Flex>
          {params.memberName && <TSDocSymbolPreview border name={params.memberName} radius={3} />}
        </Flex>
      </Container>
    </Box>
  )
}
