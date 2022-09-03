import {PortableText as PortableTextComponent, PortableTextProps} from '@portabletext/react'
import {PortableText} from '@sanity/tsdoc'
import {Box, Card, Code, Heading, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import styled from 'styled-components'

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

export function CommentContent({
  blocks,
  fontSize,
}: {
  blocks: PortableText.Node[]
  fontSize?: number
}): ReactElement {
  const components = useMemo(() => buildComponents({fontSize}), [fontSize])

  return (
    <Root data-ui="CommentContent">
      <PortableTextComponent components={components} value={blocks} />
    </Root>
  )
}

function buildComponents(opts: {fontSize?: number}): PortableTextProps['components'] {
  const {fontSize = 2} = opts

  function size(s: number | number[]): number | number[] {
    if (Array.isArray(s)) return s.flatMap(size)

    return Math.max(Math.min(fontSize + s, 4), 0)
  }

  function CodeBlock(props: {value: {code?: string; language?: string}}) {
    const {code, language = 'plain'} = props.value

    return (
      <Card border marginY={[4, 4, 5]} overflow="auto" padding={3} radius={2} tone="inherit">
        <Code language={CODE_LANGUAGES[language] || language} size={fontSize - 1}>
          {code}
        </Code>
      </Card>
    )
  }

  const fontSizes: {[tag: string]: number | number[]} = {
    h1: size([0, 0, 1, 2]),
    h2: size([-1, -1, 0, 1]),
    h3: size([-2, -2, -1, 0]),
    h4: size([-2, -2, -2, -1]),

    // TODO
    h5: size([-2, -2, -2, -1]),
    h6: size([-2, -2, -2, -1]),
  }

  function HBlock({
    as,
    children,
  }: {
    as: React.ElementType | keyof JSX.IntrinsicElements
    children: React.ReactNode
  }) {
    return (
      <Box marginTop={size([3, 3, 4])} marginBottom={size([2, 2, 3])}>
        <Heading as={as} size={typeof as === 'string' ? fontSizes[as] : undefined}>
          {children}
        </Heading>
      </Box>
    )
  }

  function H1Block({children}: {children?: React.ReactNode}) {
    return <HBlock as="h1">{children}</HBlock>
  }

  function H2Block({children}: {children?: React.ReactNode}) {
    return <HBlock as="h2">{children}</HBlock>
  }

  function H3Block({children}: {children?: React.ReactNode}) {
    return <HBlock as="h3">{children}</HBlock>
  }

  function H4Block({children}: {children?: React.ReactNode}) {
    return <HBlock as="h4">{children}</HBlock>
  }

  function H5Block({children}: {children?: React.ReactNode}) {
    return <HBlock as="h5">{children}</HBlock>
  }

  function H6Block({children}: {children?: React.ReactNode}) {
    return <HBlock as="h6">{children}</HBlock>
  }

  function BlockquoteBlock({children}: {children?: React.ReactNode}) {
    return (
      <Box as="blockquote" marginY={size([2, 2, 3])}>
        <Text as="p" muted size={size([0, 0, 1])}>
          {children}
        </Text>
      </Box>
    )
  }

  function NormalBlock({children}: {children?: React.ReactNode}) {
    return (
      <Box marginY={size([3, 3, 4])}>
        <Text as="p" muted size={size([-1, -1, 0])}>
          {children}
        </Text>
      </Box>
    )
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
