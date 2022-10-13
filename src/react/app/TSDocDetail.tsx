import {Flex, Spinner, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReferenceArticle} from '../article'
import {useMember} from './useMember'
import {usePackage} from './usePackage'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function TSDocDetail(props: {fontSize?: number}): ReactElement {
  const {fontSize = 2} = props
  const {params} = useTSDoc()
  const member = useMember({params})
  const pkg = usePackage({params})

  if (!params) {
    return <Flex align="center" height="fill" justify="center" />
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
        <Text>
          Package not found: {[params?.packageScope, params?.packageName].filter(Boolean).join('/')}
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

  return <ReferenceArticle data={member.data} fontSize={fontSize} />
}
