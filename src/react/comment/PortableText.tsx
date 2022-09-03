import {PortableText as BasePortableText, PortableTextProps} from '@portabletext/react'
import {PortableTextNode} from '@sanity/tsdoc'
import {Box, Card, Code, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import styled from 'styled-components'
import {_fontSize, _space} from '../helpers'
import {H, P} from '../typography'

const CODE_LANGUAGES: Record<string, string> = {
  sh: 'bash',
  tsx: 'typescript',
  ts: 'typescript',
}

const Root = styled.div`
  & :first-child {
    margin-top: 0;
  }

  & :last-child {
    margin-bottom: 0;
  }
`

export function PortableText(props: {
  fontSize?: number
  blocks: PortableTextNode[]
  level?: number
}): ReactElement {
  const {blocks, fontSize = 2, level = 1} = props
  const components = useMemo(() => buildComponents({fontSize, level}), [fontSize, level])

  return (
    <Root data-ui="CommentContent">
      <BasePortableText components={components} value={blocks} />
    </Root>
  )
}

function buildComponents(opts: {fontSize: number; level: number}): PortableTextProps['components'] {
  const {fontSize, level} = opts

  function CodeBlock(props: {value: {code?: string; language?: string}}) {
    const {code, language = 'plain'} = props.value

    return (
      <Card
        border
        marginY={_space(fontSize, [4, 4, 5])}
        overflow="auto"
        padding={3}
        radius={2}
        tone="inherit"
      >
        <Code language={CODE_LANGUAGES[language] || language} size={1}>
          {code}
        </Code>
      </Card>
    )
  }

  function H1Block({children}: {children?: React.ReactNode}) {
    return (
      <H fontSize={fontSize} level={level}>
        {children}
      </H>
    )
  }

  function H2Block({children}: {children?: React.ReactNode}) {
    return (
      <H fontSize={fontSize} level={level + 1}>
        {children}
      </H>
    )
  }

  function H3Block({children}: {children?: React.ReactNode}) {
    return (
      <H fontSize={fontSize} level={level + 2}>
        {children}
      </H>
    )
  }

  function H4Block({children}: {children?: React.ReactNode}) {
    return (
      <H fontSize={fontSize} level={level + 3}>
        {children}
      </H>
    )
  }

  function H5Block({children}: {children?: React.ReactNode}) {
    return (
      <H fontSize={fontSize} level={level + 4}>
        {children}
      </H>
    )
  }

  function H6Block({children}: {children?: React.ReactNode}) {
    return (
      <H fontSize={fontSize} level={level + 5}>
        {children}
      </H>
    )
  }

  function BlockquoteBlock({children}: {children?: React.ReactNode}) {
    return (
      <Box as="blockquote" marginY={_space(fontSize, [4, 4, 5])}>
        <Text as="p" muted size={_fontSize(fontSize, [1, 1, 2])}>
          {children}
        </Text>
      </Box>
    )
  }

  function NormalBlock({children}: {children?: React.ReactNode}) {
    return <P fontSize={fontSize}>{children}</P>
  }

  return {
    block: {
      blockquote: BlockquoteBlock,
      h1: H1Block,
      h2: H2Block,
      h3: H3Block,
      h4: H4Block,
      h5: H5Block,
      h6: H6Block,
      normal: NormalBlock,
    },
    types: {
      code: CodeBlock,
    },
  }
}
