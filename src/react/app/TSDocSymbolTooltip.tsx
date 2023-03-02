import {Tooltip, TooltipProps} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {Size} from '../lib/ui'
import {ReferenceTooltipContent} from '../tooltip'
import {useSymbol} from './useSymbol'

/** @beta */
export function TSDocSymbolTooltip(
  props: Omit<TooltipProps, 'content'> & {
    name: string
    packageName?: string
    packageScope?: string | null
  }
): ReactElement {
  const {name, packageName, packageScope, ...restProps} = props
  const symbol = useSymbol({name, packageName, packageScope})
  const symbolMembers = symbol?.data?.members

  const content = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    return (
      <Size delta={-1}>
        <ReferenceTooltipContent data={symbolMembers[0]!} />
      </Size>
    )
  }, [symbolMembers])

  return <Tooltip {...restProps} content={content} />
}
