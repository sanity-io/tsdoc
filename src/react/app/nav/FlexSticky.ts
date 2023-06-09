import {Box} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const BoxSticky = memo(styled(Box)`
  position: sticky;
  top: 0;
`)
