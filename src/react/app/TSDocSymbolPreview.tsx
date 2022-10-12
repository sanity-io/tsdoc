import {Box, Card, CardProps, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {ReferenceTooltipContent} from '../article'
import {SyntaxText} from '../components/ColoredCode'
import {UnformattedCode} from '../components/UnformattedCode'
import {_fontSize} from '../helpers'
import {TSDocAppParams} from '../types'
import {useMemberLink} from './useMemberLink'
import {useSymbol} from './useSymbol'

/** @beta */
export function TSDocSymbolPreview(
  props: Omit<CardProps, 'as' | 'padding'> & {fontSize?: number; name: string}
): ReactElement {
  const {fontSize = 2, name, ...restProps} = props
  const symbol = useSymbol({name})
  const symbolMembers = symbol?.data?.members

  const content = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    return <ReferenceTooltipContent data={symbolMembers[0]} fontSize={fontSize} />
  }, [fontSize, symbolMembers])

  const child: ReactElement = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return <UnformattedCode>…</UnformattedCode>

    const member = symbolMembers[0]

    if (member._type === 'api.function') {
      return <SyntaxText $syntax="function">{member.name}()</SyntaxText>
    }

    return <UnformattedCode>{member.name}</UnformattedCode>
  }, [symbolMembers])

  const params: TSDocAppParams | null = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    const member = symbolMembers[0]

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
    <Card {...restProps}>
      <Box padding={3} style={{borderBottom: '1px solid var(--card-border-color)'}}>
        <Text size={_fontSize(fontSize, [0, 0, 1])} weight="bold">
          {child}
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
