import {Box} from '@sanity/ui'

import {APIReleaseTag, TSDocComment} from '../../../core'
import {ReleaseBadge} from '../../components/ReleaseBadge'

export function TSMemberReleaseTag(props: {
  releaseTag?: APIReleaseTag
  comment?: TSDocComment
  hidePublicTag?: boolean
}): React.ReactNode | null {
  const {releaseTag, comment, hidePublicTag} = props
  const hasExperimentalTag = comment?.modifierTags?.find((tag) => tag.name === '@experimental')

  if (!hasExperimentalTag && hidePublicTag) {
    return null
  }

  return (
    <Box flex="none">
      <ReleaseBadge padding={0} releaseTag={hasExperimentalTag ? 'experimental' : releaseTag} />
    </Box>
  )
}
