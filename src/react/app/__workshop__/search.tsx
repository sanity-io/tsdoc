import {Box, Container} from '@sanity/ui'

import {TSDocSearch} from '../nav/TSDocSearch'

export default function SearchStory(): React.ReactNode {
  return (
    <Box padding={[4, 5, 6]}>
      <Container width={0}>
        <TSDocSearch />
      </Container>
    </Box>
  )
}
