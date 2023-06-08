import {TreeItem} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const TreeItemFocus = memo(styled(TreeItem)`
  &:focus > [data-ui='TreeItem__box'] {
    background: #5680d9 !important;
  }
`)
