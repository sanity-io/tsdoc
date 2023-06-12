import {Theme, TreeItem} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const TreeItemFocus = memo(
  styled(TreeItem)(({theme}: {theme: Theme}) => {
    const focusColor = theme.sanity.color.muted.primary.selected.skeleton?.from

    return `
      &:focus > [data-ui='TreeItem__box'] {
        background: ${focusColor} !important;
      }
    `
  })
)
