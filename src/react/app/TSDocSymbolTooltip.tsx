import {APIMember} from '@sanity/tsdoc'
import {Tooltip, TooltipProps} from '@sanity/ui'
import {ReactElement, useEffect, useMemo, useState} from 'react'
import {ReferenceTooltipContent} from '../article'
import {useTSDoc} from './useTSDoc'

/** @public */
export function TSDocSymbolTooltip(
  props: Omit<TooltipProps, 'content'> & {fontSize?: number; name: string}
): ReactElement {
  const {fontSize = 2, name, ...restProps} = props
  const {params, store} = useTSDoc()
  const {packageName, packageScope = null} = params || {}
  const [data, setData] = useState<APIMember[] | null>(null)

  useEffect(() => {
    if (!packageName) return

    store.symbol
      .get({
        packageName,
        packageScope,
        name,
      })
      .then((symbol) => {
        setData(symbol?.members || null)
      })
  }, [name, packageName, packageScope, store])

  const content = useMemo(() => {
    if (!data || data.length === 0) return null

    return <ReferenceTooltipContent data={data[0]} fontSize={fontSize} />
  }, [data, fontSize])

  return <Tooltip {...restProps} content={content} />
}
