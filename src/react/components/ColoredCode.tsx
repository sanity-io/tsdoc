import {ThemeColorSyntax} from '@sanity/ui'
import styled, {css} from 'styled-components'

export const SyntaxText = styled.code<{$deprecated?: boolean; $syntax?: keyof ThemeColorSyntax}>(
  ({$deprecated, $syntax, theme}) => {
    const {color} = theme.sanity

    return css`
      && {
        background-color: transparent;
        color: ${$syntax ? color.syntax[$syntax] : undefined};
        text-decoration: ${$deprecated ? 'line-through' : undefined};
      }
    `
  }
)
