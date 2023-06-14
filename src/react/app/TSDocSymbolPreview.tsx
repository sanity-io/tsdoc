import {APIMember} from '@sanity/tsdoc'
import {Box, Card, CardProps, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {TSDocAppParams} from '../../store'
import {UnformattedCode} from '../components/UnformattedCode'
import {_fontSize} from '../helpers'
import {ReferenceTooltipContent} from '../tooltip'
import {TSDocMemberTitle} from './TSDocMemberTitle'
import {useMemberLink} from './useMemberLink'
import {useSymbol} from './useSymbol'

/** @beta */
export function TSDocSymbolPreview(
  props: Omit<CardProps, 'as' | 'padding'> & {
    fontSize?: number
    member?: APIMember
    name: string
    packageName?: string
    packageScope?: string | null
  }
): ReactElement {
  const {fontSize = 2, member, name, packageName, packageScope, ...restProps} = props

  const {data} = useSymbol({
    member,
    name,
    packageName,
    packageScope,
  })

  const symbolMembers = data?.members

  const content = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    return <ReferenceTooltipContent data={symbolMembers[0]!} />
  }, [symbolMembers])

  const params: TSDocAppParams | null = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    const member = symbolMembers[0]!

    return {
      exportPath: member.export.path,
      memberName: member.name,
      packageName: member.package.name,
      packageScope: member.package.scope || null,
      releaseVersion: member.release.version,
    }
  }, [symbolMembers])

  const title = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return <UnformattedCode>…</UnformattedCode>

    const member = symbolMembers[0]!

    return <TSDocMemberTitle data={member} />
  }, [symbolMembers])

  const linkProps = useMemberLink({params})

  return (
    <Card {...restProps}>
      <Box padding={3} style={{borderBottom: '1px solid var(--card-border-color)'}}>
        <Text size={_fontSize(fontSize, [0, 0, 1])} weight="bold">
          {title}
        </Text>
      </Box>

      {content}

      <Box padding={3} style={{borderTop: '1px solid var(--card-border-color)'}}>
        <Text size={_fontSize(fontSize, [0, 0, 1])}>
          <a {...linkProps}>View full article &rarr;</a>
        </Text>
      </Box>
    </Card>
  )
}
