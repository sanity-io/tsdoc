import {SearchIcon} from '@sanity/icons'
import {APISymbol} from '@sanity/tsdoc'
import {Autocomplete, BaseAutocompleteOption, Card, Stack, Text} from '@sanity/ui'
import {ReactElement, useCallback, useMemo, useState} from 'react'
import {UnformattedCode} from '../components/UnformattedCode'
import {TSDocAppParams} from '../types'
import {useMemberLink} from './useMemberLink'
import {useSymbolSearch} from './useSymbolSearch'

interface TSDocSearchOption extends BaseAutocompleteOption {
  symbol: APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]}
}

/** @beta */
export function TSDocSearch(): ReactElement {
  const [query, setQuery] = useState<string | null>(null)
  const {data} = useSymbolSearch({query})

  const options: TSDocSearchOption[] = useMemo(
    () =>
      data.map((result) => ({
        value: result._id,
        symbol: result,
      })),
    [data]
  )

  const renderOption = useCallback((option: TSDocSearchOption) => {
    return <SearchOption symbol={option.symbol} />
  }, [])

  return (
    <Autocomplete
      filterOption={() => true}
      icon={SearchIcon}
      id="tsdoc-search"
      onQueryChange={setQuery}
      options={options}
      placeholder="Search APIs"
      popover={{portal: true}}
      renderOption={renderOption}
      renderValue={() => ''}
    />
  )
}

function SearchOption(props: {
  symbol: APISymbol & {members: {exportPath: string; releaseVersion: string}[]}
}) {
  const {symbol} = props

  const latestMember = symbol.members[0]

  const params: TSDocAppParams = useMemo(
    () => ({
      exportPath: latestMember ? latestMember.exportPath : '.',
      packageName: symbol.package.name,
      packageScope: symbol.package.scope || null,
      memberName: symbol.name,
      releaseVersion: latestMember ? latestMember.releaseVersion : '0.0.0',
    }),
    [latestMember, symbol]
  )

  const link = useMemberLink({params})

  return (
    <Card as="a" href={link.href} onClick={link.onClick} padding={3} radius={2}>
      <Stack space={3}>
        <Text size={1} weight="medium">
          <UnformattedCode>{symbol.name}</UnformattedCode>
        </Text>
        <Text muted size={1}>
          <UnformattedCode>
            {[
              [
                symbol.package.scope,
                symbol.package.name,
                latestMember?.exportPath === '.' ? undefined : latestMember?.exportPath,
              ]
                .filter(Boolean)
                .join('/'),
              '@',
              latestMember?.releaseVersion || '0.0.0',
            ]}
          </UnformattedCode>
        </Text>
      </Stack>
    </Card>
  )
}
