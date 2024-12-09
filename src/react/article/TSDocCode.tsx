import {APIToken, SanityArrayItem} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'
import {styled} from 'styled-components'

import {useTextSize} from '../lib/ui'
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
  prefix?: string
  suffix?: string
  tokens: SanityArrayItem<APIToken>[]
}): React.ReactNode {
  const {deindent, prefix = '', suffix = '', tokens} = props

  const code = (prefix + tokens.map((t) => t.text).join('') + suffix)
    .replace(/History_2/g, 'History')
    .replace(/React_2/g, 'React')
    .replace(/Plugin_2/g, 'Plugin2')
    .replace(/JSX_2/g, 'JSX')

  return (
    <Root>
      <Code size={useTextSize([-1, -1, 0])}>
        <CodeSnippet data={tokens} deindent={deindent} prefix={prefix} suffix={suffix} />
      </Code>
      <Code language="typescript" size={useTextSize([-1, -1, 0])}>
        {deindent ? code.replace(/\n\s\s/g, '\n') : code}
      </Code>
    </Root>
  )
}
