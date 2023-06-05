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
  const paddingX = useSpace([2, 2, 2, 3])
  const paddingY = useSpace([3, 3, 3, 4])

  if (!params.memberName) {
    return (
      <Box paddingX={paddingX} paddingY={paddingY}>
        <Flex align="center" height="fill" justify="center">
          <Text muted>Select an API member</Text>
        </Flex>
      </Box>
    )
  }

  if (pkg.loading || member.loading) {
    return (
      <Box paddingX={paddingX} paddingY={paddingY}>
        <Flex align="center" height="fill" justify="center">
          <Spinner />
        </Flex>
      </Box>
    )
  }

  if (!pkg.data) {
    return (
      <Box paddingX={paddingX} paddingY={paddingY}>
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
      <Box paddingX={paddingX} paddingY={paddingY}>
        <Flex align="center" height="fill" justify="center">
          <Text>Member not found: {params.memberName}</Text>
        </Flex>
      </Box>
    )
  }

  return <TSDocArticle data={member.data} />
}
