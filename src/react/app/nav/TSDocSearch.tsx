import {SearchIcon} from '@sanity/icons'
import {APISymbol, SanitySlugValue} from '@sanity/tsdoc'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {
  Autocomplete,
  BaseAutocompleteOption,
  Box,
  Card,
  Flex,
  Popover,
  Stack,
  Text,
} from '@sanity/ui'
import {ForwardedRef, forwardRef, useCallback, useMemo, useRef, useState} from 'react'

import {UnformattedCode} from '../../components/UnformattedCode'
import {useMemberLink} from '../useMemberLink'
import {useSymbolSearch} from '../useSymbolSearch'

interface TSDocSearchOption extends BaseAutocompleteOption {
  symbol: APISymbol & {_id: string; members: {exportPath: string; releaseVersion: string}[]}
}

/** @beta */
export function TSDocSearch(): React.ReactNode {
  const [query, setQuery] = useState<string | null>(null)
  const {data, loading} = useSymbolSearch({query})
  const [value, setValue] = useState<string | undefined>()
  const autocompletePopoverReferenceElementRef = useRef<HTMLDivElement | null>(null)

  const options: TSDocSearchOption[] = useMemo(
    () => data.map((result) => ({value: result._id, symbol: result})),
    [data],
  )

  const filterOption = useCallback(() => true, [])

  const handleSelect = useCallback((value: string) => {
    setValue(value)
    setTimeout(() => setValue(''), 0)
  }, [])

  const renderOption = useCallback((option: TSDocSearchOption) => {
    // @ts-expect-error - find a way to fix this
    return <SearchOption symbol={option.symbol} />
  }, [])

  const renderValue = useCallback(() => '', [])

  const renderPopover = useCallback(
    ({content, hidden}: {content: React.ReactNode | null; hidden: boolean}) => {
      return query ? (
        <Popover
          arrow={false}
          open={!loading && !hidden}
          overflow="auto"
          placement="bottom-start"
          matchReferenceWidth
          radius={0}
          content={
            content ? (
              content
            ) : (
              <Box padding={4}>
                <Flex align="center" height="fill" justify="center">
                  <Text align="center" muted>
                    No results for <strong>“{query}”</strong>
                  </Text>
                </Flex>
              </Box>
            )
          }
          referenceElement={autocompletePopoverReferenceElementRef.current}
        />
      ) : null
    },
    [loading, query],
  )

  return (
    <div ref={autocompletePopoverReferenceElementRef}>
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
        radius={2}
        renderOption={renderOption}
        renderValue={renderValue}
        renderPopover={renderPopover}
        value={value}
      />
    </div>
  )
}

const SearchOption = forwardRef(function SearchOption(
  props: {
    symbol: APISymbol & {
      members: {slug: SanitySlugValue; exportPath: string; releaseVersion: string}[]
    }
  },
  ref: ForwardedRef<HTMLDivElement>,
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
      memberSlug: latestMember ? latestMember.slug.current : '',
    }),
    [latestMember, symbol],
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
                latestMember?.exportPath === '.'
                  ? undefined
                  : latestMember?.exportPath.replace('./', '/'),
              ].filter(Boolean),
            ]}
          </UnformattedCode>
        </Text>
      </Stack>
    </Card>
  )
})
