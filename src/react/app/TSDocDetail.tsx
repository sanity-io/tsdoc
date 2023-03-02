import {Flex, Spinner, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {TSDocArticle} from '../article'
import {useMember} from './useMember'
import {usePackage} from './usePackage'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function TSDocDetail(): ReactElement {
  const {params} = useTSDoc()
  const member = useMember({params})
  const pkg = usePackage({params})

  if (!params.memberName) {
    return (
      <Flex align="center" height="fill" justify="center">
        <Text muted>Select an API member</Text>
      </Flex>
    )
  }

  if (pkg.loading || member.loading) {
    return (
      <Flex align="center" height="fill" justify="center">
        <Spinner />
      </Flex>
    )
  }

  if (!pkg.data) {
    return (
      <Flex align="center" height="fill" justify="center">
        <Text muted>
          Package not found: {[params.packageScope, params.packageName].filter(Boolean).join('/')}
        </Text>
      </Flex>
    )
  }

  if (!member.data) {
    return (
      <Flex align="center" height="fill" justify="center">
        <Text>Member not found: {params.memberName}</Text>
      </Flex>
    )
  }

  return <TSDocArticle data={member.data} />
}
