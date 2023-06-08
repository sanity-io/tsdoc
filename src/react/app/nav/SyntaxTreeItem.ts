import {TreeItem} from '@sanity/ui'
import {memo} from 'react'
import styled from 'styled-components'

export const SyntaxTreeItem = memo(styled(TreeItem)`
  &:focus code,
  & > a:focus code {
    color: inherit !important;
  }

  // change focus for api items trees
  & > a:focus {
    background: #5680d9 !important;
  }
`)
