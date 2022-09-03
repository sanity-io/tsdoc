import {TSDoc} from '@sanity/tsdoc'
import {ReactElement} from 'react'
// import {TSDocComment} from '../../../lib/api'
import {CommentContent} from './CommentContent'

export function CommentSummary(props: {data: TSDoc.Comment; fontSize?: number}): ReactElement {
  const {data, fontSize = 2} = props
  const {summary} = data

  if (!summary) return <></>

  return <CommentContent blocks={summary} fontSize={fontSize + 1} />
}
