import {Sanity} from '../_lib/sanity'
import {APIParameter, APIReleaseTag, APIToken, APITypeParameter} from './common'
import {APIExport} from './export'
import {APIPackage} from './package'
import {APIRelease} from './release'
import {TSDoc} from './tsdoc'

/** @public */
export interface APIConstructor {
  _type: 'api.constructor'
  comment?: TSDoc.Comment
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
}

/** @public */
export interface APIMethod {
  _type: 'api.method'
  comment?: TSDoc.Comment
  isOptional: boolean
  isStatic: boolean
  name: string
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIProperty {
  _type: 'api.property'
  comment?: TSDoc.Comment
  isEventProperty: boolean
  isOptional: boolean
  isStatic: boolean
  name: string
  releaseTag?: APIReleaseTag
  type: Sanity.ArrayItem<APIToken>[]
}

/** @public */
export interface APICallSignature {
  _type: 'api.callSignature'
  comment?: TSDoc.Comment
  members: unknown[]
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIConstructSignature {
  _type: 'api.constructSignature'
  comment?: TSDoc.Comment
  members: unknown[]
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIMethodSignature {
  _type: 'api.methodSignature'
  comment?: TSDoc.Comment
  isOptional: boolean
  members: unknown[]
  name: string
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIPropertySignature {
  _type: 'api.propertySignature'
  comment?: TSDoc.Comment
  isOptional: boolean
  name: string
  releaseTag?: APIReleaseTag
  type: Sanity.ArrayItem<APIToken>[]
}

/** @public */
export interface APIIndexSignature {
  _type: 'api.indexSignature'
  comment?: TSDoc.Comment
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
}

/** @public */
export interface APIEnumMember {
  _type: 'api.enumMember'
  name: string
  releaseTag?: APIReleaseTag
}

/** @public */
export interface APIFunction {
  _type: 'api.function'
  comment?: TSDoc.Comment
  name: string
  parameters: Sanity.ArrayItem<APIParameter>[]
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIIndentifier {
  _type: 'api.identifier'
  comment?: TSDoc.Comment
  name: string
  releaseTag?: APIReleaseTag
}

/** @public */
export interface APIClass {
  _type: 'api.class'
  comment?: TSDoc.Comment
  export: APIExport
  members: Sanity.ArrayItem<APIConstructor | APIProperty | APIMethod>[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: Sanity.SlugValue
}

/** @public */
export interface APIEnum {
  _type: 'api.enum'
  comment?: TSDoc.Comment
  export: APIExport
  members: Sanity.ArrayItem<APIEnumMember>[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: Sanity.SlugValue
}

/** @public */
export interface APIFunction {
  _type: 'api.function'
  comment?: TSDoc.Comment
  export: APIExport
  isReactComponentType: boolean
  name: string
  package: APIPackage
  parameters: Sanity.ArrayItem<APIParameter>[]
  propsType?: APIInterface
  release: APIRelease
  releaseTag?: APIReleaseTag
  returnType: Sanity.ArrayItem<APIToken>[]
  slug: Sanity.SlugValue
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIInterface {
  _type: 'api.interface'
  comment?: TSDoc.Comment
  export: APIExport
  extends: {_type: 'api.extend'; type: Sanity.ArrayItem<APIToken>[]}[]
  members: Sanity.ArrayItem<
    | APICallSignature
    | APIConstructSignature
    | APIMethodSignature
    | APIPropertySignature
    | APIIndexSignature
  >[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: Sanity.SlugValue
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APINamespace {
  _type: 'api.namespace'
  comment?: TSDoc.Comment
  export: APIExport
  members: Sanity.ArrayItem<APIMember>[]
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: Sanity.SlugValue
}

/** @public */
export interface APITypeAlias {
  _type: 'api.typeAlias'
  comment?: TSDoc.Comment
  export: APIExport
  name: string
  package: APIPackage
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: Sanity.SlugValue
  type: Sanity.ArrayItem<APIToken>[]
  typeParameters: Sanity.ArrayItem<APITypeParameter>[]
}

/** @public */
export interface APIVariable {
  _type: 'api.variable'
  comment?: TSDoc.Comment
  export: APIExport
  isReactComponentType: boolean
  name: string
  package: APIPackage
  propsType?: APIMember
  release: APIRelease
  releaseTag?: APIReleaseTag
  slug: Sanity.SlugValue
  type: Sanity.ArrayItem<APIToken>[]
}

/** @public */
export type APIMember =
  | APIClass
  | APIEnum
  | APIFunction
  | APIInterface
  | APINamespace
  | APITypeAlias
  | APIVariable
