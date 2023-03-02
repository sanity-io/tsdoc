export function isArray<T = unknown>(val: unknown): val is Array<T> {
  return Array.isArray(val)
}
