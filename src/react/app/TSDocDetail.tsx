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

  return (
    <>
      <Card padding={[4, 5, 6]} tone="positive">
        <Stack space={5}>
          <Flex>
            <Text>
              Symbol:{' '}
              <TSDocSymbolTooltip fontSize={fontSize - 2} name={member.data.name} portal>
                <code>{member.data.name}</code>
              </TSDocSymbolTooltip>
            </Text>
          </Flex>

          <Flex>
            <TSDocSymbol
              border
              fontSize={fontSize}
              name={member.data.name}
              padding={2}
              radius={2}
              tone="inherit"
            />
          </Flex>

          <TSDocSymbolPreview
            border
            fontSize={fontSize}
            name={member.data.name}
            radius={2}
            tone="inherit"
          />
        </Stack>
      </Card>

      <ReferenceArticle data={member.data} fontSize={fontSize} />
    </>
  )
}
