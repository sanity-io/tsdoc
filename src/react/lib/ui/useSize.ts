import {useContext, useMemo} from 'react'
import {addResponsiveProp} from './addResponsiveProp'
import {SizeContext} from './SizeContext'

export function useSize(props?: {size?: number | number[]; min?: number; max?: number}): number[] {
  const {min = 0, max = Infinity, size = 0} = props || {}
  const delta = useContext(SizeContext) ?? 0

  const __cache_key__ = JSON.stringify([size, delta])

  return useMemo(
    () => addResponsiveProp(size, delta).map((s) => Math.min(Math.max(s, min), max)),

    // Improve performance: Keep object identify for a given hash of the value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [__cache_key__],
  )
}
