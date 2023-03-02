import styled, {css} from 'styled-components'

export const UnformattedCode = styled.code<{$deprecated?: boolean}>(({$deprecated}) => {
  return css`
    && {
      background-color: transparent;
      color: inherit;
      text-decoration: ${$deprecated ? 'line-through' : undefined};
    }
  `
})
