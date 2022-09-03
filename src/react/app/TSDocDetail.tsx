import {Card, Code, Flex, Spinner, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReferenceArticle} from '../article'
import {TSDocSymbolTooltip} from './TSDocSymbolTooltip'
import {useMember} from './useMember'
import {usePackage} from './usePackage'
import {useTSDoc} from './useTSDoc'

/** @public */
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
      {member && (
        <Card hidden padding={[4, 5, 6]} tone="positive">
          <Flex>
            <Text>
              Symbol:{' '}
              <TSDocSymbolTooltip name={member.name} portal>
                <code>{member?.name}</code>
              </TSDocSymbolTooltip>
            </Text>
          </Flex>
        </Card>
      )}

      {member && <ReferenceArticle data={member} />}

      <Card hidden overflow="auto" padding={[4, 5, 6]} tone="primary">
        <Code language="json" size={1}>
          {JSON.stringify(member, null, 2)}
        </Code>
      </Card>
    </Card>
  )
}
