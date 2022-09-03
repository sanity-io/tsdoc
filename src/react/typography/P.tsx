import {Box, Text} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'
import {_fontSize, _space} from '../helpers'

export function P(props: {children?: ReactNode; fontSize?: number}): ReactElement {
  const {children, fontSize = 2} = props

  return (
    <Box marginY={_space(fontSize, [2, 2, 3])}>
      <Text as="p" muted size={_fontSize(fontSize, [2, 2, 3])}>
        {children}
      </Text>
    </Box>
  )
}
