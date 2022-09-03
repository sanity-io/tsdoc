export function _fontSize(fontSize: number, sizes: number[]): number[] {
  return sizes.map((f) => Math.min(Math.max(f + (fontSize - 2), 0), 4))
}

export function _space(fontSize: number, s: number | number[]): number | number[] {
  if (Array.isArray(s)) return s.flatMap(_space)

  return Math.max(Math.min(fontSize + s, 9), 0)
}
