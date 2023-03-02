import {isArray} from '../isArray'

export function addResponsiveProp(a: number | number[], b: number | number[]): number[] {
  const _a = isArray(a) ? a : [a]
  const _b = isArray(b) ? b : [b]

  const len = Math.max(_a.length, _b.length)
  const ret: number[] = []

  for (let i = 0; i < len; i += 1) {
    const aSize = _a[i] ?? _a[_a.length - 1] ?? 0
    const bSize = _b[i] ?? _b[_b.length - 1] ?? 0

    ret.push(aSize + bSize)
  }

  return ret
}
