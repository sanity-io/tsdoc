import {APIMember, APIMethodSignature} from '@sanity/tsdoc'
import {Box, Card, Code, Flex, Label, Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'

import {CommentBox, CommentSummary} from '../../comment'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSMethodSignatureMember(props: {
  data: APIMemberWithInheritance<APIMethodSignature>
  member: APIMember
}): ReactElement {
  const {data, member} = props
  const {comment, releaseTag} = data

  const title = useMemo(() => {
    let t = member.name as string

    t += `${data.name}(`
    t += data.parameters?.map((p) => p.name).join(', ') || ''
    t += `)`

    return t
  }, [data, member])

  return (
    <Card border overflow="hidden" radius={3} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex gap={1} padding={2}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} />

        <Box flex="none">
          <Code
            // as={`h${level}` as any}
            language="ts"
            style={{fontWeight: 700, whiteSpace: 'nowrap'}}
          >
            {title}
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
      {data.parameters && data.parameters.length > 0 && (
        <Card overflow="auto" padding={4} tone="inherit">
          <Box marginBottom={4}>
            <Label>Parameters</Label>
          </Box>

          <Stack space={3}>
            {data.parameters.map((param) => (
              <TSDocCode deindent key={param._key} prefix={`${param.name}: `} tokens={param.type} />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}
