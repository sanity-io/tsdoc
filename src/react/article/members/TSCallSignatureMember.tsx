import {Box, Card, Code, Flex, Label, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {APICallSignature} from '../../../core'
import {CommentBox, CommentSummary} from '../../comment'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSCallSignatureMember(props: {
  data: APIMemberWithInheritance<APICallSignature>
  // fontSize?: number
  // level?: number
}): ReactElement {
  const {
    data,
    // fontSize = 2, level = 1
  } = props
  const {comment, parameters, releaseTag} = data

  return (
    <Card border overflow="hidden" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex align="flex-start" gap={1} padding={2}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} />

        <Box flex={1}>
          <Code
            // as={`h${level}` as any}
            language="ts"
            // size={_fontSize(fontSize, [1, 1, 2])}
          >
            {data.parameters?.map((p) => p.name).join(', ')}
          </Code>
        </Box>
      </Flex>

      {comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={comment} />
        </CommentBox>
      )}

      {data.inheritedFrom && (
        <Box marginTop={3}>
          <MemberInheritedFrom data={data.inheritedFrom} />
        </Box>
      )}

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <Card borderTop overflow="auto" padding={4} tone="inherit">
          <Label
            muted
            // size={_fontSize(fontSize, [1, 1, 2])}
          >
            Parameters
          </Label>

          <Stack marginTop={4} space={3}>
            {data.parameters.map((param) => (
              <TSDocCode deindent key={param._key} prefix={`${param.name}: `} tokens={param.type} />
            ))}
          </Stack>
        </Card>
      )}

      {data.returnType && (
        <Card borderTop overflow="auto" padding={4} tone="inherit">
          <Label
            muted
            // size={_fontSize(fontSize, [1, 1, 2])}
          >
            Return type
          </Label>

          <Box marginTop={4}>
            <TSDocCode deindent tokens={data.returnType} />
          </Box>
        </Card>
      )}
    </Card>
  )
}
