import {TSDoc} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import styled from 'styled-components'
import {CommentContent} from './CommentContent'

const H = styled.h1<{level: any}>``

export function CommentExampleBlocks(props: {
  data: TSDoc.Comment
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 2} = props
  const {exampleBlocks} = data

  if (!exampleBlocks || exampleBlocks.length === 0) return <></>

  return (
    <>
      <H level={level}>Examples</H>

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
  data: TSDoc.ExampleBlock
  index: number
}): ReactElement {
  const {data, fontSize = 2, index, level = 3} = props

  if (!data.content) return <></>

  return (
    <>
      <H level={level}>Example {index + 1}</H>
      <CommentContent blocks={data.content} fontSize={fontSize} />
    </>
  )
}
