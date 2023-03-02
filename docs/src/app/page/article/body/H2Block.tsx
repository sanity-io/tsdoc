import {PortableTextComponentProps} from '@portabletext/react'
import {PortableTextBlock} from '@portabletext/types'
import {Box, Heading} from '@sanity/ui'
import {ReactElement} from 'react'

export function H2Block(props: PortableTextComponentProps<PortableTextBlock>): ReactElement {
  const {children} = props

  return (
    <Box marginTop={6} marginBottom={4}>
      <Heading as="h2" size={[2, 2, 2, 3]}>
        {children}
      </Heading>
    </Box>
  )
}
