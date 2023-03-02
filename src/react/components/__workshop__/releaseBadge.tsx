import {Box, Inline} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReleaseBadge} from '../ReleaseBadge'

export default function ReleaseBadgeStory(): ReactElement {
  return (
    <Box padding={4}>
      <Inline space={1}>
        <ReleaseBadge releaseTag="alpha" />
        <ReleaseBadge releaseTag="beta" />
        <ReleaseBadge releaseTag="public" />
        <ReleaseBadge releaseTag="internal" />
      </Inline>
    </Box>
  )
}
