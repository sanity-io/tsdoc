import {PortableText, PortableTextComponents} from '@portabletext/react'
import {ArticleData} from '../../types'
import {APIMemberMark} from './APIMemberMark'
import {CodeBlock} from './CodeBlock'
import {H2Block} from './H2Block'
import {ParagraphBlock} from './ParagraphBlock'

const components: PortableTextComponents = {
  block: {
    normal: ParagraphBlock,
    h2: H2Block,
  },

  marks: {
    apiSymbol: APIMemberMark,
  },

  types: {
    code: CodeBlock,
  },
}

export function Body(props: {data: ArticleData['body']}) {
  const {data} = props

  return <PortableText components={components} value={data} />
}
