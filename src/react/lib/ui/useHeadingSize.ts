import {useTheme} from '@sanity/ui'
import {useMemo} from 'react'

import {isArray} from '../isArray'
import {useLevel} from './useLevel'
import {useSize} from './useSize'

export function useHeadingSize(size: number | number[]): number[] {
  const {fonts} = useTheme().sanity
  const level = useLevel()

  const levelSize = useMemo(() => {
    const s = isArray(size) ? size : [size]

    return s.map((v) => v - level + 2)
  }, [level, size])

  return useSize({size: levelSize, min: 0, max: fonts.heading.sizes.length - 1})
}
