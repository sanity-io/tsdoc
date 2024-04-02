import {SanityArrayItem, SerializedAPIToken} from '@sanity/tsdoc'
import {Card, Code as UICode} from '@sanity/ui'
import {ReactElement} from 'react'
import {ArrayOfObjectsInputProps} from 'sanity'
import {IntentLink} from 'sanity/router'
import styled from 'styled-components'

const Code = styled(UICode)`
  & a {
    color: var(--card-link-color);

    &:hover {
      text-decoration: underline;
    }
  }
`

export function APITokensInput(
  props: ArrayOfObjectsInputProps<SanityArrayItem<SerializedAPIToken>>,
): ReactElement {
  const {value = []} = props

  return (
    <Card border padding={3} overflow="auto" radius={1}>
      <Code size={1}>
        {value.length > 0 && value.map((token) => <TokenPreview key={token._key} token={token} />)}
        {value.length === 0 && ' '}
      </Code>
    </Card>
  )
}

function TokenPreview({token}: {token: SanityArrayItem<SerializedAPIToken>}) {
  if (token.member?._ref) {
    return (
      <IntentLink intent="edit" params={{id: token.member?._ref}}>
        {token.text}
      </IntentLink>
    )
  }

  return <>{token.text}</>
}
