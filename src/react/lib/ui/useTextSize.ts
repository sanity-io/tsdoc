import {useTheme} from '@sanity/ui'

import {useSize} from './useSize'

export function useTextSize(size: number | number[]): number[] {
  const {fonts} = useTheme().sanity

  return useSize({size, min: 0, max: fonts.text.sizes.length - 1})
}
