import {TreeItem, Theme} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const SyntaxTreeItem = memo(
  styled(TreeItem)(({theme}: {theme: Theme}) => {
    const focusColor = theme.sanity.color.muted.primary.selected.skeleton?.from

    return `
      &:focus code,
      & > a:focus code {
        color: inherit !important;
      }

      // change focus for api items trees
      & > a:focus {
        background: ${focusColor} !important;
      }
    `
  })
)
