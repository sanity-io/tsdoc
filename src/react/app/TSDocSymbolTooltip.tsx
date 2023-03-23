import {APIMember} from '@sanity/tsdoc'
import {Tooltip, TooltipProps} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {Size} from '../lib/ui'
import {ReferenceTooltipContent} from '../tooltip'
import {useSymbol} from './useSymbol'

/** @beta */
export function TSDocSymbolTooltip(
  props: Omit<TooltipProps, 'content'> & {
    member?: APIMember
    name: string
    packageName?: string
    packageScope?: string | null
  }
): ReactElement {
  const {member, name, packageName, packageScope, ...restProps} = props

  const {data} = useSymbol({
    member,
    name,
    packageName,
    packageScope,
  })

  const symbolMembers = data?.members

  const content = useMemo(() => {
    if (!symbolMembers || symbolMembers.length === 0) return null

    const member = symbolMembers[0]!

    return (
      <Size delta={-1}>
        <ReferenceTooltipContent data={member} />
      </Size>
    )
  }, [symbolMembers])

  return <Tooltip {...restProps} content={content} />
}
