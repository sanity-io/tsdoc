export function testFunction(a: number, b?: number): number {
  return a + (b ?? 0)
}
