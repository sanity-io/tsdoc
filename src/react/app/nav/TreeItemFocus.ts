import {Theme, TreeItem} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const TreeItemFocus = memo(
  styled(TreeItem)(({theme}: {theme: Theme}) => {
    const text = theme.sanity.color.muted.default.hovered.muted.fg

    return `
      &:focus > [data-ui='TreeItem__box'] {
        background-color: transparent !important;

        & svg, & code {
          color: ${text} !important;
        }
      }
    `
  })
)
