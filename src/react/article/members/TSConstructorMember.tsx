import {APIConstructor, APIMember} from '@sanity/tsdoc'
import {Box, Card, Code, Flex, Label, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {ReleaseBadge} from '../../components/ReleaseBadge'
// import {useSize} from '../../lib/ui'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'

export function TSContructorMember(props: {
  data: APIMemberWithInheritance<APIConstructor>
  member: APIMember
}): ReactElement {
  const {data, member} = props
  const {comment, parameters} = data
  // const fontSize = useSize()
  const hasExperimentalTag = comment?.modifierTags?.find((tag) => tag.name === '@experimental')

  const title = `new ${member.name}(${parameters.map((p) => p.name).join(', ') || ''})`

  return (
    <Card border overflow="hidden" radius={3} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex align="flex-start" gap={1} padding={2}>
        <Box flex="none">
          <ReleaseBadge releaseTag={data.releaseTag} />
        </Box>

        {hasExperimentalTag && (
          <Box flex="none">
            <ReleaseBadge releaseTag="experimental" />
          </Box>
        )}

        <Box flex={1} padding={1}>
          <Code language="ts">{title}</Code>
        </Box>
      </Flex>

      {comment?.summary && (
        <CommentBox padding={3}>
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
        <Card borderTop overflow="auto" padding={3} tone="inherit">
          <Label muted>Parameters</Label>

          <Stack marginTop={3} space={3}>
            {data.parameters.map((param) => (
              <TSDocCode deindent key={param._key} prefix={`${param.name}: `} tokens={param.type} />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}
