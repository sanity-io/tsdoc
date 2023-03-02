import {APIEnumMember} from '@sanity/tsdoc'
import {Box, Card, Code, Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReleaseBadge} from '../../components/ReleaseBadge'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'

export function TSEnumMember(props: {
  data: APIMemberWithInheritance<APIEnumMember>
  level?: number
}): ReactElement {
  const {data} = props

  return (
    <Card border overflow="auto" radius={3}>
      <Flex align="flex-start" gap={1} padding={3}>
        <Box flex="none">
          <ReleaseBadge releaseTag={data.releaseTag} />
        </Box>

        <Box flex="none">
          <Code as="h3" language="ts">
            {data.name}
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
