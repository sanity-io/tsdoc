import {Box, Heading, HeadingProps} from '@sanity/ui'
import {HTMLProps} from 'react'

import {useHeadingSize} from './useHeadingSize'
import {useLevel} from './useLevel'
import {useSpace} from './useSpace'

export function H(
  props: Omit<HeadingProps, 'as'> & Omit<HTMLProps<HTMLDivElement>, 'as' | 'ref' | 'size'>,
): React.ReactNode {
  const {size: sizeProp = 0, ...restProps} = props
  const level = useLevel()

  return (
    <Box
      marginTop={useSpace(level === 1 ? [1, 1, 2, 3] : [2, 2, 3, 4])}
      marginBottom={useSpace([2, 2, 2, 3])}
    >
      <Heading as={`h${level}` as 'h1'} {...restProps} size={useHeadingSize(sizeProp)} />
    </Box>
  )
}
