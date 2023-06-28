import {APIIndexSignature} from '@sanity/tsdoc'
import {Box, Card, Code, Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReleaseBadge} from '../../components/ReleaseBadge'
import {APIMemberWithInheritance} from './_types'
import {MemberInheritedFrom} from './MemberInheritedFrom'

export function TSIndexSignatureMember(props: {
  data: APIMemberWithInheritance<APIIndexSignature>
  fontSize?: number
  level?: number
}): ReactElement {
  const {data} = props
  const {comment} = data
  const hasExperimentalTag = comment?.modifierTags?.find((tag) => tag.name === '@experimental')

  return (
    <Card border overflow="auto" radius={3}>
      <Flex align="flex-start" gap={1} padding={3}>
        <Box flex="none">
          <ReleaseBadge releaseTag={data.releaseTag} />
        </Box>

        {hasExperimentalTag && (
          <Box flex="none">
            <ReleaseBadge releaseTag="experimental" />
          </Box>
        )}

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
