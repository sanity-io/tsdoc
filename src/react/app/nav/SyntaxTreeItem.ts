import {TreeItem, Theme} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const SyntaxTreeItem = memo(
  styled(TreeItem)(({theme}: {theme: Theme}) => {
    const background = theme.sanity.color.selectable.default.enabled.bg2
    const color = theme.sanity.color.selectable.default.hovered.fg

    return `
      // focuses solely on changing the "()" color
      &:focus code:nth-child(2),
      & > a:focus code:nth-child(2) {
        color: ${color} !important;
      }

      // change focus for api items trees
      & > a:focus {
        background: ${background} !important;
      }
    `
  })
)
