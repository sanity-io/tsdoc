/* eslint-disable @typescript-eslint/no-namespace */

/** @public */
export namespace Sanity {
  /** @public */
  export interface DocumentValue {
    _type: string
    _id: string
    _rev?: string
    _updatedAt?: string
    _createdAt?: string
    [key: string]: unknown
  }

  /** @public */
  export interface ReferenceValue {
    _type: 'reference'
    _ref: string
    _weak?: boolean
  }

  /** @public */
  export interface SlugValue {
    _type: 'slug'
    current: string
  }

  /** @public */
  export type ArrayItem<T> = T & {_key: string}
}
