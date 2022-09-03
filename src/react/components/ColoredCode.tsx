import {ThemeColorSyntax} from '@sanity/ui'
import styled, {css} from 'styled-components'

export const SyntaxText = styled.code<{$syntax: keyof ThemeColorSyntax}>(({$syntax, theme}) => {
  const {color} = theme.sanity

  return css`
    && {
      background-color: transparent;
      color: ${color.syntax[$syntax]};
    }
  `
})
