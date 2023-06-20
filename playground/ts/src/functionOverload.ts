/**
 * @public
 * @param x - A number
 */
export function testOverload(x: number): number
/**
 * @public
 * @param x - A string
 */
export function testOverload(x: string): string
/**
 * @public
 * @param x - A boolean
 */
export function testOverload(x: boolean): boolean

/**
 * @public
 */
export function testOverload(x: unknown): unknown {
  return x
}
