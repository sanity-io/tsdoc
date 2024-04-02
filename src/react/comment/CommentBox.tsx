import {Box} from '@sanity/ui'
import {styled} from 'styled-components'

export const CommentBox = styled(Box)`
  /* border-top: 1px solid var(--card-border-color); */

  & > *:first-child {
    margin-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`
