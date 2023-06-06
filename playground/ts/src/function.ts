import {BaseInterface} from './interface'

/**
 * Test function with link to BaseInterface
 *
 * @public
 * @param options - Base Interface Link out
 *  {@link BaseInterface | BaseInterface}
 *
 * @returns string
 */
export function testFunctionLink(options: BaseInterface): string {
  return `${options.id} ${options.foo}`
}

export function testFunction(a: number, b?: number): number {
  return a + (b ?? 0)
}
