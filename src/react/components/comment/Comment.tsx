import {TSDoc} from '@sanity/tsdoc'
import {Box} from '@sanity/ui'
import {ReactElement} from 'react'
import styled from 'styled-components'
// import {TSDocComment} from '../../../lib/api'
import {CommentDeprecatedCallout} from './CommentDeprecatedCallout'
import {CommentExampleBlocks} from './CommentExampleBlocks'
import {CommentRemarks} from './CommentRemarks'
import {CommentSummary} from './CommentSummary'

const Root = styled(Box)`
  & :first-child {
    margin-top: 0;
  }

  & :last-child {
    margin-bottom: 0;
  }
`

export function Comment(props: {
  data: TSDoc.Comment
  fontSize?: number
  marginTop?: number
}): ReactElement {
  const {data, fontSize, marginTop} = props

  return (
    <Root marginTop={marginTop}>
      <CommentDeprecatedCallout data={data} fontSize={fontSize} />
      <CommentSummary data={data} fontSize={fontSize} />
      <CommentRemarks data={data} fontSize={fontSize} />
      <CommentExampleBlocks data={data} fontSize={fontSize} />
    </Root>
  )
}
