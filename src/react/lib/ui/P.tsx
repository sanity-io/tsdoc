import {Box, Text, TextProps} from '@sanity/ui'
import {HTMLProps, ReactElement} from 'react'
import {useSpace} from './useSpace'
import {useTextSize} from './useTextSize'

export function P(
  props: Omit<TextProps, 'as'> & Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'>,
): ReactElement {
  const {size: sizeProp = 0, ...restProps} = props

  return (
    <Box data-ui="P" marginTop={useSpace([-1, -1, -1])}>
      <Text as="p" {...restProps} size={useTextSize(sizeProp)} />
    </Box>
  )
}
