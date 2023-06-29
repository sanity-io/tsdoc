import {PortableText as BasePortableText, PortableTextProps} from '@portabletext/react'
import {PortableTextNode} from '@sanity/tsdoc'
import {Box, Card, Code} from '@sanity/ui'
import {ReactElement} from 'react'
import {H, Level, P, useSpace, useTextSize} from '../lib/ui'

const CODE_LANGUAGES: Record<string, string> = {
  sh: 'bash',
  tsx: 'typescript',
  ts: 'typescript',
}

export function PortableText(props: {blocks: PortableTextNode[]}): ReactElement {
  const {blocks} = props

  return <BasePortableText components={components} value={blocks} />
}

const components: PortableTextProps['components'] = {
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

function CodeBlock(props: {value: {code?: string; language?: string}}) {
  const {code, language = 'plain'} = props.value

  return (
    <Card
      border
      marginY={useSpace([1, 1, 2, 3])}
      overflow="auto"
      padding={4}
      radius={3}
      tone="inherit"
    >
      <Code language={CODE_LANGUAGES[language] || language} size={useTextSize([-1, -1, 0])}>
        {code}
      </Code>
    </Card>
  )
}

function H1Block({children}: {children?: React.ReactNode}) {
  return <H size={[-1, 0, 1, 2]}>{children}</H>
}

function H2Block({children}: {children?: React.ReactNode}) {
  return (
    <Level>
      <H size={[-1, 0, 1, 2]}>{children}</H>
    </Level>
  )
}

function H3Block({children}: {children?: React.ReactNode}) {
  return (
    <Level>
      <Level>
        <H size={[-1, 0, 1, 2]}>{children}</H>
      </Level>
    </Level>
  )
}

function H4Block({children}: {children?: React.ReactNode}) {
  return (
    <Level>
      <Level>
        <Level>
          <H size={[-1, 0, 1, 2]}>{children}</H>
        </Level>
      </Level>
    </Level>
  )
}

function H5Block({children}: {children?: React.ReactNode}) {
  return (
    <Level>
      <Level>
        <Level>
          <Level>
            <H size={[-1, 0, 1, 2]}>{children}</H>
          </Level>
        </Level>
      </Level>
    </Level>
  )
}

function H6Block({children}: {children?: React.ReactNode}) {
  return (
    <Level>
      <Level>
        <Level>
          <Level>
            <Level>
              <H size={[-1, 0, 1, 2]}>{children}</H>
            </Level>
          </Level>
        </Level>
      </Level>
    </Level>
  )
}

function BlockquoteBlock({children}: {children?: React.ReactNode}) {
  return (
    <Box as="blockquote">
      <P muted size={[-1, 0, 1]}>
        {children}
      </P>
    </Box>
  )
}

function NormalBlock({children}: {children?: React.ReactNode}) {
  return <P muted>{children}</P>
}
