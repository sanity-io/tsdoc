import {Theme, TreeItem} from '@sanity/ui'
import {memo} from 'react'
import {styled} from 'styled-components'

export const TreeItemFocus = memo(
  styled(TreeItem)(({theme}: {theme: Theme}) => {
    const text = theme.sanity.color.selectable.default.enabled.fg

    return `
      &:focus > [data-ui='TreeItem__box'],
      &:focus > [data-ui="TreeItem"] {
        background-color: transparent !important;

        & svg, & code, & [data-ui="Text"] {
          color: ${text} !important;
        }
      }
    `
  }),
)
