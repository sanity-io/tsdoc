import {Flex} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const FlexSticky = memo(styled(Flex)`
  position: sticky;
  top: 0;
`)
