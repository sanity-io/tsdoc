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
      marginTop={
        marginTop ||
        _space(fontSize, [Math.max(6 - level, 4), Math.max(7 - level, 4), Math.max(6 - level, 4)])
      }
      marginBottom={_space(fontSize, [
        Math.max(3 - level, 3),
        Math.max(3 - level, 3),
        Math.max(4 - level, 3),
      ])}
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
