import {APIConstructor, APIMember} from '@sanity/tsdoc'
import {Box, Card, Code, Flex, Label, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
// import {useSize} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSContructorMember(props: {
  data: APIMemberWithInheritance<APIConstructor>
  member: APIMember
}): ReactElement {
  const {data, member} = props
  const {comment, parameters, releaseTag} = data
  // const fontSize = useSize()

  const title = `new ${member.name}(${parameters.map((p) => p.name).join(', ') || ''})`

  return (
    <Card
      border
      overflow="hidden"
      padding={4}
      radius={3}
      tone={comment?.deprecated ? 'critical' : 'inherit'}
    >
      <Flex align="flex-start" gap={1}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} />

        <Box flex={1} paddingBottom={4}>
          <Code language="ts">{title}</Code>
        </Box>
      </Flex>

      {comment?.summary && (
        <CommentBox>
          <CommentSummary data={comment} />
        </CommentBox>
      )}

      {data.inheritedFrom && (
        <Box padding={3}>
          <MemberInheritedFrom data={data.inheritedFrom} />
        </Box>
      )}

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <Card borderTop overflow="auto" padding={4} tone="inherit">
          <Label muted>Parameters</Label>

          <Stack marginTop={4} space={3}>
            {data.parameters.map((param) => (
              <TSDocCode deindent key={param._key} prefix={`${param.name}: `} tokens={param.type} />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}
