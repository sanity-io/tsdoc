import {APIIndexSignature} from '@sanity/tsdoc'
import {Box, Card, Code, Flex} from '@sanity/ui'

import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'
import {TSMemberReleaseTag} from './TSMemberReleaseTag'

export function TSIndexSignatureMember(props: {
  data: APIMemberWithInheritance<APIIndexSignature>
  fontSize?: number
  level?: number
}): React.ReactNode {
  const {data} = props
  const {comment, releaseTag} = data

  return (
    <Card border overflow="auto" radius={3}>
      <Flex align="flex-start" gap={1} padding={3}>
        <TSMemberReleaseTag comment={comment} releaseTag={releaseTag} />

        <Box flex="none">
          <Code as="h3" language="ts">
            TODO
          </Code>
        </Box>
      </Flex>

      {data.inheritedFrom && (
        <Box marginTop={3}>
          <MemberInheritedFrom data={data.inheritedFrom} />
        </Box>
      )}
    </Card>
  )
}
