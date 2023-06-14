import {Box, Flex, Spinner, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {TSDocArticle} from '../article'
import {useSpace} from '../lib/ui'
import {useMember} from './useMember'
import {usePackage} from './usePackage'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function TSDocDetail(): ReactElement {
  const {params} = useTSDoc()
  const member = useMember({params})
  const pkg = usePackage({params})
  const padding = useSpace([3, 3, 3, 3])

  if (!params.memberSlug) {
    return (
      <Box padding={padding}>
        <Flex align="center" height="fill" justify="center">
          <Text muted>Select an API member</Text>
        </Flex>
      </Box>
    )
  }

  if (pkg.loading || member.loading) {
    return (
      <Box padding={padding}>
        <Flex align="center" height="fill" justify="center">
          <Spinner />
        </Flex>
      </Box>
    )
  }

  if (!pkg.data) {
    return (
      <Box padding={padding}>
        <Flex align="center" height="fill" justify="center">
          <Text muted>
            Package not found: {[params.packageScope, params.packageName].filter(Boolean).join('/')}
          </Text>
        </Flex>
      </Box>
    )
  }

  if (!member.data) {
    return (
      <Box padding={padding}>
        <Flex align="center" height="fill" justify="center">
          <Text>Member not found: {params.memberName}</Text>
        </Flex>
      </Box>
    )
  }

  return <TSDocArticle data={member.data} />
}
