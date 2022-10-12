import {Tooltip, TooltipProps} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {ReferenceTooltipContent} from '../article'
import {useSymbol} from './useSymbol'

/** @beta */
export function TSDocSymbolTooltip(
  props: Omit<TooltipProps, 'content'> & {fontSize?: number; name: string}
): ReactElement {
  const {fontSize = 2, name, ...restProps} = props
  const symbol = useSymbol({name})
  const symbolMembers = symbol?.data?.members

  const content = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    return <ReferenceTooltipContent data={symbolMembers[0]} fontSize={fontSize} />
  }, [fontSize, symbolMembers])

  return <Tooltip {...restProps} content={content} />
}
