import {useTheme} from '@sanity/ui'
import {useSize} from './useSize'

export function useSpace(size: number | number[]): number[] {
  const {space} = useTheme().sanity

  return useSize({size, min: 0, max: space.length - 1})
}
