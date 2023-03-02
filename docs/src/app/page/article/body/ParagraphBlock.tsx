import {PortableTextComponentProps} from '@portabletext/react'
import {PortableTextBlock} from '@portabletext/types'
import {Box, Text} from '@sanity/ui'
import {ReactElement} from 'react'

export function ParagraphBlock(props: PortableTextComponentProps<PortableTextBlock>): ReactElement {
  const {children} = props

  return (
    <Box marginY={4}>
      <Text muted size={[2, 2, 2, 3]}>
        {children}
      </Text>
    </Box>
  )
}
