import {MenuItem, Theme} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const SyntaxMenuItem = memo(styled(MenuItem)`
  &:focus code,
  & > a:focus code {
    color: inherit !important;
  }

  & > a:focus {
    background: transparent !important;
  }
`)
