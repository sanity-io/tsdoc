import {APIReleaseTag} from '@sanity/tsdoc'
import {Card, CardTone, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {useTextSize} from '../lib/ui'
import {UnformattedCode} from './UnformattedCode'

export function ReleaseBadge(props: {
  padding?: number
  radius?: number
  releaseTag?: APIReleaseTag
}): ReactElement {
  const {padding = 1, radius = 2, releaseTag} = props

  const releaseTone: CardTone = useMemo(() => {
    if (releaseTag === 'alpha') return 'primary'
    if (releaseTag === 'beta') return 'caution'
    if (releaseTag === 'public') return 'positive'

    return 'primary'
  }, [releaseTag])

  return (
    <Card padding={padding} radius={radius} tone={releaseTone}>
      <Text muted size={useTextSize([-1, -1, 0])}>
        <UnformattedCode>{`@${releaseTag || 'public'}`}</UnformattedCode>
      </Text>
    </Card>
  )
}
