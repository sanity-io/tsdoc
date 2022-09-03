import {APIToken, Sanity} from '@sanity/tsdoc'
import {Box, Code, CodeProps} from '@sanity/ui'
import {ReactElement} from 'react'
import styled from 'styled-components'
import {Tokens} from './Tokens'

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
    /* opacity: 0; */
  }
`

export function TSDocCode(props: {
  deindent?: boolean
  prefix?: string
  size?: CodeProps['size']
  suffix?: string
  tokens: Sanity.ArrayItem<APIToken>[]
}): ReactElement {
  const {deindent, prefix = '', size, suffix = '', tokens} = props

  const code = (prefix + tokens.map((t) => t.text).join('') + suffix)
    .replace(/History_2/g, 'History')
    .replace(/React_2/g, 'React')

  return (
    <Root>
      <Code size={size}>
        <Tokens data={tokens} deindent={deindent} prefix={prefix} suffix={suffix} />
      </Code>

      <Code language="typescript" size={size}>
        {deindent ? code.replace(/\n\s\s/g, '\n') : code}
      </Code>
    </Root>
  )
}
