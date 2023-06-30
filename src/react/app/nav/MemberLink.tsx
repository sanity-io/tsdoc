import {APIMember, APINamespace} from '@sanity/tsdoc'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {Box, CardTone, Flex} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {SyntaxText} from '../../components/ColoredCode'
import {useSize} from '../../lib/ui'
import {TSDocMemberTitle} from '../TSDocMemberTitle'
import {useMemberLink} from '../useMemberLink'
import {useTSDoc} from '../useTSDoc'
import {SyntaxTreeItem} from './SyntaxTreeItem'

export function MemberLink(props: {data: APIMember; namespace?: APINamespace}): ReactElement {
  const {data, namespace} = props
  const {basePath, path} = useTSDoc()
  const fontSize = useSize()

  const params: TSDocAppParams = useMemo(
    () => ({
      exportPath: data.export?.path || namespace?.export.path || '.',
      memberName: data.name,
      packageName: data.package.name,
      packageScope: data.package.scope || null,
      releaseVersion: data.release.version,
      memberSlug: data.slug.current,
    }),
    [data, namespace]
  )

  const linkProps = useMemberLink({params})

  const tone: CardTone | undefined = useMemo(() => {
    if (data.releaseTag === 'beta') return 'caution'
    if (data.releaseTag === 'alpha') return 'critical'

    return undefined
  }, [data.releaseTag])

  const tag = useMemo(() => {
    if (data.releaseTag === 'beta') {
      return (
        <Box>
          <SyntaxText $syntax="string">@beta</SyntaxText>
        </Box>
      )
    }

    if (data.releaseTag === 'alpha') {
      return (
        <Box>
          <SyntaxText $syntax="builtin">@alpha</SyntaxText>
        </Box>
      )
    }

    return null
  }, [data.releaseTag])

  const isSelected = `${basePath}${path}` === linkProps.href

  return (
    <SyntaxTreeItem
      {...linkProps}
      fontSize={fontSize}
      padding={2}
      selected={isSelected}
      text={
        <Flex gap={1}>
          <Box flex={1}>
            <TSDocMemberTitle data={data} />
          </Box>
          {tag}
        </Flex>
      }
      tone={tone}
    />
  )
}
