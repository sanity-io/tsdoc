import {TSDocComment, TSDocExampleBlock} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {H} from '../typography/H'
import {PortableText} from './PortableText'

export function CommentExampleBlocks(props: {
  data: TSDocComment
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props
  const {exampleBlocks} = data

  if (!exampleBlocks || exampleBlocks.length === 0) return <></>

  return (
    <>
      <H fontSize={fontSize} level={level}>
        Examples
      </H>

      {exampleBlocks.map((exampleBlock, idx: number) => (
        <CommentExampleBlock
          fontSize={fontSize}
          key={exampleBlock._key}
          level={level + 1}
          data={exampleBlock}
          index={idx}
        />
      ))}
    </>
  )
}

export function CommentExampleBlock(props: {
  fontSize?: number
  level?: number
  data: TSDocExampleBlock
  index: number
}): ReactElement {
  const {data, fontSize = 2, index, level = 1} = props

  if (!data.content) return <></>

  return (
    <>
      <H fontSize={fontSize} level={level}>
        Example #{index + 1}
      </H>

      <PortableText blocks={data.content} fontSize={fontSize} />
    </>
  )
}
