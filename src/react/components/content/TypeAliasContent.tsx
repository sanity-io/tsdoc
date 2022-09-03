import {APITypeAlias} from '@sanity/tsdoc'
import {Box, Card, Code, Heading, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {
  CommentDeprecatedCallout,
  CommentExampleBlocks,
  CommentRemarks,
  CommentSummary,
} from '../comment'
import {TSDocCode} from '../TSDocCode'

export function TypeAliasContent(props: {data: APITypeAlias}): ReactElement {
  const {data} = props
  const {comment, name, type, typeParameters = []} = data

  return (
    <Stack>
      {comment?.deprecated?.content && (
        <Box marginTop={4}>
          <CommentDeprecatedCallout data={comment} />
        </Box>
      )}

      {comment?.summary && (
        <Box marginTop={4}>
          <CommentSummary data={comment} />
        </Box>
      )}

      {type && (
        <Card border marginTop={5} overflow="auto" padding={4} radius={2} tone="inherit">
          <TSDocCode prefix={`type ${name} = `} size={1} tokens={type} />
        </Card>
      )}

      {comment && <CommentRemarks data={comment} />}

      {typeParameters && (
        <Box marginTop={6}>
          <Heading as="h2" size={1}>
            Type parameters
          </Heading>

          <Box marginTop={4}>
            <Code language="json" size={1}>
              {JSON.stringify(typeParameters, null, 2)}
            </Code>
          </Box>
        </Box>
      )}

      {comment && <CommentExampleBlocks data={comment} />}
    </Stack>
  )
}
