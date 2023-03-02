import {TSDocAppParams} from '@sanity/tsdoc/store'
import {Card, CardProps, Text, Tooltip, TooltipProps} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {UnformattedCode} from '../components/UnformattedCode'
import {_fontSize} from '../helpers'
import {Size} from '../lib/ui'
import {ReferenceTooltipContent} from '../tooltip'
import {TSDocMemberTitle} from './TSDocMemberTitle'
import {useMemberLink} from './useMemberLink'
import {useSymbol} from './useSymbol'

/** @beta */
export function TSDocSymbol(
  props: Omit<CardProps, 'as'> & {
    fontSize?: number
    name: string
    tooltip?: Omit<TooltipProps, 'content'>
  }
): ReactElement {
  const {fontSize = 2, name, tooltip, ...restProps} = props
  const symbol = useSymbol({name})
  const symbolMembers = symbol?.data?.members

  const content = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    return (
      <Size delta={-1}>
        <ReferenceTooltipContent data={symbolMembers[0]!} />
      </Size>
    )
  }, [symbolMembers])

  const child = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return <UnformattedCode>…</UnformattedCode>

    const member = symbolMembers[0]!

    return <TSDocMemberTitle data={member} />
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

  const linkProps = useMemberLink({params})

  return (
    <Tooltip content={content} portal {...tooltip}>
      <Card as="a" {...restProps} {...linkProps}>
        <Text size={_fontSize(fontSize, [1, 1, 2])}>{child}</Text>
      </Card>
    </Tooltip>
  )
}
