import {Card, Flex, Spinner, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReferenceArticle} from '../article'
import {useMember} from './useMember'
import {usePackage} from './usePackage'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function TSDocDetail(): ReactElement {
  const {params} = useTSDoc()
  const {data: member} = useMember({params})
  const {data: pkg} = usePackage({params})

  if (params && !pkg) {
    return (
      <Card flex={1} height="fill">
        <Flex align="center" height="fill" justify="center">
          <Spinner />
        </Flex>
      </Card>
    )
  }

  if (!pkg) {
    return (
      <Card flex={1} height="fill">
        <Flex align="center" height="fill" justify="center">
          <Text>
            Package not found:{' '}
            {[params?.packageScope, params?.packageName, params?.exportPath]
              .filter(Boolean)
              .join('/')}
          </Text>
        </Flex>
      </Card>
    )
  }

  return (
    <Card flex={1} overflow="auto">
      {member && <ReferenceArticle data={member} />}
    </Card>
  )
}
