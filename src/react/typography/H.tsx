import {Box, Heading} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'
import {_fontSize, _space} from '../helpers'

export function H(props: {
  children?: ReactNode
  fontSize?: number
  level?: number
  marginTop?: number | number[]
}): ReactElement {
  const {children, fontSize = 2, level = 1, marginTop} = props

  return (
    <Box
      marginTop={marginTop || _space(fontSize, [1, 2, 3])}
      marginBottom={_space(fontSize, [1, 1, 2])}
    >
      <Heading
        as={`h${level}` as 'h1'}
        size={_fontSize(fontSize, [1 - level, 2 - level, 3 - level])}
      >
        {children}
      </Heading>
    </Box>
  )
}
