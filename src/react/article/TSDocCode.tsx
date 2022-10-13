import {APIToken, SanityArrayItem} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'
import {ReactElement} from 'react'
import styled from 'styled-components'
import {_fontSize} from '../helpers'
import {CodeSnippet} from './CodeSnippet'

const Root = styled(Box)`
  position: relative;

  & > pre:first-child {
    position: absolute;
    color: transparent;
    inset: 0;

    & a {
      border-radius: 2px;
      color: inherit;

      &:hover {
        background: var(--card-code-bg-color);
      }
    }
  }

  & > pre:last-child {
    pointer-events: none;
  }
`

export function TSDocCode(props: {
  deindent?: boolean
  fontSize?: number
  prefix?: string
  suffix?: string
  tokens: SanityArrayItem<APIToken>[]
}): ReactElement {
  const {deindent, fontSize = 2, prefix = '', suffix = '', tokens} = props

  const code = (prefix + tokens.map((t) => t.text).join('') + suffix)
    .replace(/History_2/g, 'History')
    .replace(/React_2/g, 'React')

  return (
    <Root>
      <Code size={_fontSize(fontSize, [1, 1, 2])}>
        <CodeSnippet
          data={tokens}
          deindent={deindent}
          fontSize={fontSize - 1}
          prefix={prefix}
          suffix={suffix}
        />
      </Code>

      <Code language="typescript" size={_fontSize(fontSize, [1, 1, 2])}>
        {deindent ? code.replace(/\n\s\s/g, '\n') : code}
      </Code>
    </Root>
  )
}
