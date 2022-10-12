import {TestClass} from './class'

/**
 * `TestTypeAlias` is a type.
 *
 * @remarks
 *
 * # Testing
 *
 * This is a paragraph.
 *
 * ```ts
 * import {TestTypeAlias} from 'ts'
 *
 * const a: TestTypeAlias<'bar'> = 'bar'
 * ```
 *
 * @beta
 */
export type TestTypeAlias<T = any> = 'foo' | T

/** @alpha */
export type TestType = typeof TestClass
