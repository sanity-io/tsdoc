import {
  PortableText as BasePortableText,
  PortableTextMarkComponentProps,
  PortableTextProps,
} from '@portabletext/react'
import {PortableTextNode} from '@sanity/tsdoc'
import {Box, Card, Code} from '@sanity/ui'
import {ReactElement, useCallback, MouseEvent, useMemo} from 'react'
import {useTSDoc} from '../app'
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
  marks: {
    link: Link,
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

function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url))
  } catch (error) {
    return false
  }
}

function Link(props: PortableTextMarkComponentProps) {
  const {basePath, onPathChange, params} = useTSDoc()
  const {value, text} = props
  const {packageName, exportPath} = params

  const url = value?.['href']

  const isExternalUrl = useMemo(() => isValidUrl(url), [url])

  const href = useMemo(() => {
    // If the url is pointing to external URL than return that
    if (isExternalUrl) return url

    const urlSegments = url.split('/')

    // URL can be of two types:
    // if it's referencing the same package then it will just have the name
    // if it's referencing another package then it will also have the exportPath in the name
    if (urlSegments.length === 1) {
      // exportPath is either `.`  or `./router`
      return `/${packageName}${exportPath?.replace('.', '')}/${url}`
    }

    return `/${packageName}/${urlSegments.join('/')}`
  }, [exportPath, isExternalUrl, packageName, url])

  const handleClick = useCallback(
    (e: MouseEvent) => {
      // If the url is pointing to external URL don't call onPathChange
      if (isExternalUrl) return
      e.preventDefault()

      onPathChange(href)
    },
    [href, isExternalUrl, onPathChange]
  )

  return (
    <a href={`${basePath}${href}`} onClick={handleClick}>
      {text}
    </a>
  )
}
