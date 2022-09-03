/* eslint-disable @typescript-eslint/no-namespace */

import {Sanity} from '../sanity'

/**
 * @public
 */
export namespace PortableText {
  /**
   * @public
   */
  export interface SpanNode {
    _type: 'span'
    _markDef?: {
      _key?: string
      _type: 'link'
      href: string
    }
    marks?: string[]
    text: string
  }

  /**
   * @public
   */
  export interface CodeNode {
    _type: 'code'
    code: string
    language: string
  }

  /**
   * @public
   */
  export interface BlockNode {
    _type: 'block'
    style: string
    children: Sanity.ArrayItem<Node>[]
    markDefs: Sanity.ArrayItem<SpanNode['_markDef']>[]
  }

  /**
   * @public
   */
  export type Node = SpanNode | CodeNode | BlockNode
}
