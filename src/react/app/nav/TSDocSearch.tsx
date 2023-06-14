import {SearchIcon} from '@sanity/icons'
import {APISymbol} from '@sanity/tsdoc'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {Autocomplete, BaseAutocompleteOption, Card, Stack, Text} from '@sanity/ui'
import {ForwardedRef, forwardRef, ReactElement, useCallback, useMemo, useState} from 'react'
import {UnformattedCode} from '../../components/UnformattedCode'
import {useMemberLink} from '../useMemberLink'
import {useSymbolSearch} from '../useSymbolSearch'

interface TSDocSearchOption extends BaseAutocompleteOption {
  symbol: APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]}
}

/** @beta */
export function TSDocSearch(): ReactElement {
  const [query, setQuery] = useState<string | null>(null)
  const {data, loading} = useSymbolSearch({query})
  const [value, setValue] = useState<string | undefined>()

  const options: TSDocSearchOption[] = useMemo(
    () =>
      data
        .filter((result) => result.members.length > 0)
        .map((result) => ({value: result._id, symbol: result})),
    [data]
  )

  const filterOption = useCallback(() => true, [])

  const handleSelect = useCallback((value: string) => {
    setValue(value)
    setTimeout(() => setValue(''), 0)
  }, [])

  const renderOption = useCallback((option: TSDocSearchOption) => {
    return <SearchOption symbol={option.symbol} />
  }, [])

  const renderValue = useCallback(() => '', [])

  return (
    <Autocomplete
      filterOption={filterOption}
      icon={SearchIcon}
      id="tsdoc-search"
      loading={loading}
      onQueryChange={setQuery}
      onSelect={handleSelect}
      options={options}
      padding={3}
      placeholder="Search for API members"
      popover={{portal: true}}
      radius={2}
      renderOption={renderOption}
      renderValue={renderValue}
      value={value}
    />
  )
}

const SearchOption = forwardRef(function SearchOption(
  props: {
    symbol: APISymbol & {members: {exportPath: string; releaseVersion: string}[]}
  },
  ref: ForwardedRef<HTMLDivElement>
) {
  const {symbol, ...restProps} = props

  const latestMember = symbol.members[0]

  const params: TSDocAppParams = useMemo(
    () => ({
      exportPath: latestMember ? latestMember.exportPath : '.',
      packageName: symbol.package.name,
      packageScope: symbol.package.scope || null,
      memberName: symbol.name,
      releaseVersion: latestMember ? latestMember.releaseVersion : '0.0.0',
      // symbols currently don't have a slug, so we just use the name
      // not sure if we want to add the slug?
      memberSlug: symbol.name.toLowerCase(),
    }),
    [latestMember, symbol]
  )

  const link = useMemberLink({params})

  return (
    <Card
      {...restProps}
      as="a"
      href={link.href}
      onClick={link.onClick}
      padding={3}
      radius={2}
      ref={ref}
    >
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
})
