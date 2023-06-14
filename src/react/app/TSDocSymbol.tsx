import {APIMember} from '@sanity/tsdoc'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {Card, CardProps, Text, Tooltip, TooltipProps} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import styled from 'styled-components'
import {UnformattedCode} from '../components/UnformattedCode'
import {_fontSize} from '../helpers'
import {Size} from '../lib/ui'
import {ReferenceTooltipContent} from '../tooltip'
import {TSDocMemberTitle} from './TSDocMemberTitle'
import {useMemberLink} from './useMemberLink'
import {useSymbol} from './useSymbol'

const Root = styled(Card)`
  &:not([hidden]) {
    display: inline-block;
  }

  &:hover {
    text-decoration: none;
  }
`

/** @beta */
export function TSDocSymbol(
  props: Omit<CardProps, 'as'> & {
    member?: APIMember
    fontSize?: number
    name: string
    packageScope?: string | null
    packageName?: string | null
    tooltip?: Omit<TooltipProps, 'content'>
  }
): ReactElement {
  const {member, fontSize = 2, name, packageScope, packageName, tooltip, ...restProps} = props

  const {data} = useSymbol({
    member,
    name,
    packageName,
    packageScope,
  })

  const symbolMembers = data?.members

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
      exportPath: member.export?.path,
      memberName: member.name,
      packageName: member.package.name,
      packageScope: member.package.scope || null,
      releaseVersion: member.release.version,
    }
  }, [symbolMembers])

  const linkProps = useMemberLink({params})

  return (
    <Tooltip content={content} portal {...tooltip}>
      <Root as="a" {...restProps} {...linkProps}>
        <Text size={_fontSize(fontSize, [1, 1, 2])}>{child}</Text>
      </Root>
    </Tooltip>
  )
}
