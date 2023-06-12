import {Tree} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const TreeNav = memo(styled(Tree)`
  overflow: scroll;
  height: 100vh;
  padding-top: 0.75rem;
`)
