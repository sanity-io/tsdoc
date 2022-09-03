import {ThemeColorSyntax} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'
import {SyntaxText} from './ColoredCode'

const TAG_SYNTAX: Record<string, keyof ThemeColorSyntax> = {
  '@alpha': 'class',
  '@beta': 'regex',
  '@public': 'function',
}

export function ReleaseTag(props: {children?: ReactNode; $tag: string}): ReactElement {
  const {$tag, children} = props

  return <SyntaxText $syntax={TAG_SYNTAX[$tag] || 'comment'}>{children}</SyntaxText>
}
