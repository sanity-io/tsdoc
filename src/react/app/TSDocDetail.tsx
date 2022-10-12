import {Card, Flex, Spinner, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {ReferenceArticle} from '../article'
import {TSDocSymbol} from './TSDocSymbol'
import {TSDocSymbolPreview} from './TSDocSymbolPreview'
import {TSDocSymbolTooltip} from './TSDocSymbolTooltip'
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
      {member && (
        <Card padding={[4, 5, 6]} tone="positive">
          <Stack space={5}>
            <Flex>
              <Text>
                Symbol:{' '}
                <TSDocSymbolTooltip name={member.name} portal>
                  <code>{member?.name}</code>
                </TSDocSymbolTooltip>
              </Text>
            </Flex>

            <Flex>
              <TSDocSymbol border name={member.name} padding={2} radius={2} tone="inherit" />
            </Flex>

            <TSDocSymbolPreview border name={member.name} radius={2} tone="inherit" />
          </Stack>
        </Card>
      )}

      {member && <ReferenceArticle data={member} />}
    </Card>
  )
}
