import {blue} from '@sanity/color'
import {TreeItem, Theme, rem} from '@sanity/ui'
import {memo} from 'react'
import styled, {css} from 'styled-components'

export const SyntaxTreeItem = memo(
  styled(TreeItem)(({theme, $level}: {theme: Theme; $level: number}) => {
    const isThemeDark = theme.sanity.color.dark
    const activeBackground = blue[50].hex
    const focusBackground = theme?.sanity?.color?.selectable?.default.enabled.bg2
    const color = theme?.sanity?.color?.selectable?.default.hovered.fg
    const {space = []} = theme.sanity

    const selectedLight = isThemeDark
      ? ''
      : `&[data-selected] > [role='treeitem'] {
      background-color: ${activeBackground} !important
    }`

    return css`
      /**
       * Style Block Copied from https://github.com/sanity-io/ui/blob/main/src/components/tree/style.ts#L94-L107
       *
       * Since forwardedAs only works when "as" keyword is used and not custom named prop
      */
      padding-left: ${rem(space[2] ?? 1 * $level)};

      a {
        display: block;
        min-height: 0px;
        min-width: 0px;
        text-decoration: none;
      }

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
