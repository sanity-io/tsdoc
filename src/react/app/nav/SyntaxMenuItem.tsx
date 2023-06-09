import {MenuItem, Theme} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const SyntaxMenuItem = memo(
  styled(MenuItem)(({theme}: {theme: Theme}) => {
    const focusColor = theme.sanity.color.muted.primary.selected.skeleton?.from

    return `
      &:focus code,
      & > a:focus code {
        color: inherit !important;
      }

      & > a:focus {
        background: ${focusColor} !important;
      }
    `
  })
)
