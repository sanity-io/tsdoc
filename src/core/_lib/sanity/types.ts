/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */

/** @public */
export type SanityDocumentValue<T extends {}> = T & {
  _type: string
  _id: string
  _rev?: string
  _updatedAt?: string
  _createdAt?: string
  slug?: SanitySlugValue
}

/** @public */
export interface SanityReferenceValue {
  _type: 'reference'
  _ref: string
  _weak?: boolean
}

/** @public */
export interface SanitySlugValue {
  _type: 'slug'
  current: string
}

/** @public */
export type SanityArrayItem<T> = T & {_key: string}
