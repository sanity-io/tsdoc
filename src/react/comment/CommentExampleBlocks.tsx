import {TSDocComment, TSDocExampleBlock} from '@sanity/tsdoc'

import {H, Level} from '../lib/ui'
import {PortableText} from './PortableText'

export function CommentExampleBlocks(props: {data: TSDocComment}): React.ReactNode {
  const {data} = props
  const {exampleBlocks} = data

  if (!exampleBlocks || exampleBlocks.length === 0) return <></>
  const showPerExampleHeader = exampleBlocks.length > 1

  return (
    <>
      <H size={[-1, 0, 1, 2]}>Examples</H>

      {exampleBlocks.map((exampleBlock, idx: number) => (
        <Level key={exampleBlock._key}>
          <CommentExampleBlock data={exampleBlock} index={idx} showHeader={showPerExampleHeader} />
        </Level>
      ))}
    </>
  )
}

export function CommentExampleBlock(props: {
  data: TSDocExampleBlock
  index: number
  showHeader: boolean
}): React.ReactNode {
  const {data, index, showHeader} = props

  if (!data.content) return <></>

  return (
    <>
      {showHeader && <H size={[-1, 0, 1, 2]}>Example #{index + 1}</H>}

      <PortableText blocks={data.content} />
    </>
  )
}
