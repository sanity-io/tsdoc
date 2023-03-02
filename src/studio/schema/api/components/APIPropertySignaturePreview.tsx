import {Box, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {PreviewProps} from 'sanity'
import styled from 'styled-components'

const StyledText = styled(Text)`
  code {
    background-color: transparent;
    color: inherit;
  }
`

export function APIPropertySignaturePreview(props: PreviewProps): ReactElement {
  const {name, isOptional, type} = props as any

  return (
    <Box padding={2}>
      <Stack space={2}>
        <StyledText size={1} textOverflow="ellipsis" weight="semibold">
          <code>
            {name}
            {isOptional ? '?' : ''}: {type?.map((t: any) => t.text).join('')}
          </code>
        </StyledText>
        <Text muted size={1}>
          Property signature
        </Text>
      </Stack>
    </Box>
  )
}
