import {cyan, green, yellow} from '@sanity/color'
import {ThemeColor, ThemeColorSyntax} from '@sanity/ui'
import {css, styled} from 'styled-components'

export const SyntaxText = styled.code<{$deprecated?: boolean; $syntax?: keyof ThemeColorSyntax}>(
  ({$deprecated, $syntax, theme}) => {
    const {color} = theme.sanity

    return css`
      && {
        background-color: transparent;
        color: ${$syntax ? overrideSyntaxColors(color, $syntax) : undefined};
        text-decoration: ${$deprecated ? 'line-through' : undefined};
      }
    `
  },
)

const overrideSyntaxColors = (color: ThemeColor, $syntax: keyof ThemeColorSyntax) => {
  const isDarkMode = color.dark

  // adds support for issues with light theme
  switch ($syntax) {
    case 'function':
      return !isDarkMode ? green[700].hex : color.syntax[$syntax]
    case 'string':
      return !isDarkMode ? yellow[700].hex : color.syntax[$syntax]
    case 'className':
      return !isDarkMode ? cyan[700].hex : color.syntax[$syntax]
    default:
      return color.syntax[$syntax]
  }
}
