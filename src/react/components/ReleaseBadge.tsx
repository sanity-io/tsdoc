import {InfoOutlineIcon} from '@sanity/icons'
import {APIReleaseTag} from '@sanity/tsdoc'
import {Box, Card, CardTone, Flex, Text, Tooltip} from '@sanity/ui'
import {useMemo} from 'react'

import {useTextSize} from '../lib/ui'
import {ReleaseBadgeTextWrapper} from './ReleaseBadgeTextWrapper'
import {UnformattedCode} from './UnformattedCode'

export function ReleaseBadge(props: {
  padding?: number
  radius?: number
  releaseTag?: APIReleaseTag
}): React.ReactNode {
  const {padding = 1, radius = 2, releaseTag} = props

  const releaseTone: CardTone = useMemo(() => {
    if (releaseTag === 'alpha') return 'primary'
    if (releaseTag === 'beta') return 'caution'
    if (releaseTag === 'public') return 'positive'

    return 'primary'
  }, [releaseTag])

  const explanation: string = useMemo(() => {
    if (releaseTag === 'alpha' || releaseTag === 'experimental')
      return `The API is in very early stages of development. Breaking changes are not only expected but very likely.\n We strongly recommend against using it in a production environment.`
    if (releaseTag === 'beta')
      return `The API is in a testing phase and is considered immature. Breaking changes are expected.\n We don't recommend using it in a production environment.`
    if (releaseTag === 'public') return 'The API is public and stable.'

    return 'primary'
  }, [releaseTag])

  return (
    <>
      <Card padding={padding} radius={radius} tone={releaseTone}>
        <Text muted size={useTextSize([-1, -1, 0])}>
          <Flex align={'center'} gap={2}>
            <UnformattedCode>{`@${releaseTag || 'public'}`}</UnformattedCode>

            <Text muted size={0}>
              <Tooltip
                content={
                  <Box padding={2} sizing="content">
                    <ReleaseBadgeTextWrapper muted size={1}>
                      {explanation}
                    </ReleaseBadgeTextWrapper>
                  </Box>
                }
                fallbackPlacements={['bottom', 'top', 'left']}
                placement="right"
                portal
              >
                <InfoOutlineIcon />
              </Tooltip>
            </Text>
          </Flex>
        </Text>
      </Card>
    </>
  )
}
