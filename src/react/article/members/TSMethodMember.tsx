import {APIMember, APIMethod} from '@sanity/tsdoc'
import {Box, Card, Code, Flex, Label, Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {CommentBox, CommentSummary} from '../../comment'
import {ReleaseBadge} from '../../components/ReleaseBadge'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'

export function TSMethodMember(props: {
  data: APIMemberWithInheritance<APIMethod>
  member: APIMember
}): ReactElement {
  const {data, member} = props
  const {comment} = data

  const title = useMemo(() => {
    let t = data.isStatic ? `${member.name}.` : ''

    t += `${data.name}(`
    t += data.parameters?.map((p) => p.name).join(', ') || ''
    t += `)`

    return t
  }, [data, member])

  return (
    <Card border overflow="auto" radius={3} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex align="flex-start" gap={1} padding={2}>
        {data.releaseTag && data.releaseTag !== 'public' && (
          <Box flex="none">
            <ReleaseBadge releaseTag={data.releaseTag} />
          </Box>
        )}

        <Box flex="none" padding={1}>
          <Code as="h3" language="ts">
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
        <Card borderTop padding={3} tone="inherit">
          <MemberInheritedFrom data={data.inheritedFrom} />
        </Card>
      )}

      {/* Parameters */}
      {data.parameters && data.parameters.length > 0 && (
        <Card borderTop padding={3} tone="inherit">
          <Box marginBottom={3}>
            <Label muted>Parameters</Label>
          </Box>

          <Stack space={3}>
            {data.parameters.map((param) => (
              <TSDocCode deindent key={param._key} prefix={`${param.name}: `} tokens={param.type} />
            ))}
          </Stack>
        </Card>
      )}

      {/* Return type */}
      {data.returnType && data.returnType.length > 0 && (
        <Card borderTop padding={3} tone="inherit">
          <Box marginBottom={3}>
            <Label muted>Returns</Label>
          </Box>

          <TSDocCode deindent tokens={data.returnType} />
        </Card>
      )}
    </Card>
  )
}