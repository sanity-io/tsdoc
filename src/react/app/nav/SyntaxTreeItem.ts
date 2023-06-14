import {blue} from '@sanity/color'
import {TreeItem, Theme} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const SyntaxTreeItem = memo(
  styled(TreeItem)(({theme}: {theme: Theme}) => {
    const isThemeDark = theme.sanity.color.dark
    const activeBackground = blue[50].hex
    const focusBackground = theme.sanity.color.selectable.default.enabled.bg2
    const color = theme.sanity.color.selectable.default.hovered.fg

    const selectedLight = isThemeDark
      ? ''
      : `&[data-selected] > [role='treeitem'] {
      background-color: ${activeBackground} !important
    }`

    return `  
      // solely on changing the "()" color
      &:focus code,
      & > a:focus code {
        color: ${color} !important;
      }

      ${selectedLight}

      // change focus for api items trees
      & > a:focus {
        background-color: ${focusBackground} !important;
      }
    `
  })
)
