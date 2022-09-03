/* eslint-disable @typescript-eslint/no-namespace */

import {PortableText} from '../_lib/portable-text'
import {Sanity} from '../_lib/sanity'

/** @public */
export namespace TSDoc {
  /** @public */
  export interface ParamBlock {
    _type: 'tsdoc.paramBlock'
    content?: PortableText.Node[]
    name: string
  }

  /** @public */
  export interface ReturnsBlock {
    _type: 'tsdoc.returnsBlock'
    content?: PortableText.Node[]
  }

  /** @public */
  export interface RemarksBlock {
    _type: 'tsdoc.remarksBlock'
    content?: PortableText.Node[]
  }

  /** @public */
  export interface CustomBlock {
    _type: 'tsdoc.customBlock'
    content?: PortableText.Node[]
    tag: string
  }

  /** @public */
  export interface ExampleBlock {
    _type: 'tsdoc.exampleBlock'
    content?: PortableText.Node[]
  }

  /** @public */
  export interface SeeBlock {
    _type: 'tsdoc.seeBlock'
    content?: PortableText.Node[]
  }

  /** @public */
  export interface DeprecatedBlock {
    _type: 'tsdoc.deprecatedBlock'
    content?: PortableText.Node[]
  }

  /** @public */
  export interface ModifierTag {
    _type: 'tsdoc.modifierTag'
    name: string
  }

  /** @public */
  export interface Comment {
    _type: 'tsdoc.docComment'
    customBlocks?: Sanity.ArrayItem<CustomBlock>[]
    deprecated?: DeprecatedBlock
    exampleBlocks?: Sanity.ArrayItem<ExampleBlock>[]
    modifierTags?: Sanity.ArrayItem<ModifierTag>[]
    parameters?: Sanity.ArrayItem<ParamBlock>[]
    remarks?: RemarksBlock
    returns?: ReturnsBlock
    seeBlocks?: Sanity.ArrayItem<SeeBlock>[]
    summary?: Sanity.ArrayItem<PortableText.Node>[]
  }
}
