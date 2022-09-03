/* eslint-disable @typescript-eslint/no-namespace */

import {Sanity} from '../_lib/sanity'
import {
  APIParameter as ResolvedAPIParameter,
  APIToken as ResolvedAPIToken,
  APITypeParameter as ResolvedAPITypeParameter,
} from './common'
import {
  APICallSignature as ResolvedAPICallSignature,
  APIClass as ResolvedAPIClass,
  APIConstructor as ResolvedAPIConstructor,
  APIConstructSignature as ResolvedAPIConstructSignature,
  APIEnum as ResolvedAPIEnum,
  APIFunction as ResolvedAPIFunction,
  APIIndexSignature as ResolvedAPIIndexSignature,
  APIInterface as ResolvedAPIInterface,
  APIMethod as ResolvedAPIMethod,
  APIMethodSignature as ResolvedAPIMethodSignature,
  APINamespace as ResolvedAPINamespace,
  APIProperty as ResolvedAPIProperty,
  APIPropertySignature as ResolvedAPIPropertySignature,
  APITypeAlias as ResolvedAPITypeAlias,
  APIVariable as ResolvedAPIVariable,
} from './members'

/** @public */
export namespace Serialized {
  /** @public */
  export interface APIEnum extends Omit<ResolvedAPIEnum, 'export' | 'package' | 'release'> {
    export: Sanity.ReferenceValue
    package: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
  }

  /** @public */
  export interface APINamespace
    extends Omit<ResolvedAPINamespace, 'export' | 'members' | 'package' | 'release'> {
    export: Sanity.ReferenceValue
    members: Sanity.ArrayItem<APIMember>[]
    package: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
  }

  /** @public */
  export interface APIParameter extends Omit<ResolvedAPIParameter, 'type'> {
    type: Sanity.ArrayItem<APIToken>[]
  }

  /** @public */
  export interface APIToken extends Omit<ResolvedAPIToken, 'member'> {
    member?: Sanity.ReferenceValue
  }

  /** @public */
  export interface APITypeParameter
    extends Omit<ResolvedAPITypeParameter, 'constraintType' | 'defaultType'> {
    constraintType?: Sanity.ArrayItem<APIToken>[]
    defaultType: Sanity.ArrayItem<APIToken>[]
  }

  /** @public */
  export interface APITypeAlias
    extends Omit<
      ResolvedAPITypeAlias,
      'export' | 'package' | 'release' | 'type' | 'typeParameters'
    > {
    export: Sanity.ReferenceValue
    type: Sanity.ArrayItem<APIToken>[]
    package: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
    typeParameters: Sanity.ArrayItem<Serialized.APITypeParameter>[]
  }

  /** @public */
  export interface APIVariable
    extends Omit<ResolvedAPIVariable, 'export' | 'package' | 'propsType' | 'release' | 'type'> {
    export: Sanity.ReferenceValue
    type: Sanity.ArrayItem<APIToken>[]
    package: Sanity.ReferenceValue
    propsType?: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
  }

  /** @public */
  export interface APIClass
    extends Omit<ResolvedAPIClass, 'export' | 'members' | 'package' | 'release'> {
    export: Sanity.ReferenceValue
    members: Sanity.ArrayItem<APIClassMember>[]
    package: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
  }

  /** @public */
  export interface APIFunction
    extends Omit<
      ResolvedAPIFunction,
      | 'export'
      | 'package'
      | 'parameters'
      | 'propsType'
      | 'release'
      | 'returnType'
      | 'typeParameters'
    > {
    export: Sanity.ReferenceValue
    package: Sanity.ReferenceValue
    parameters: Sanity.ArrayItem<APIParameter>[]
    propsType?: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
    returnType: Sanity.ArrayItem<APIToken>[]
    typeParameters: Sanity.ArrayItem<APITypeParameter>[]
  }

  /** @public */
  export interface APIInterface
    extends Omit<
      ResolvedAPIInterface,
      'export' | 'extends' | 'members' | 'package' | 'release' | 'typeParameters'
    > {
    _type: 'api.interface'
    export: Sanity.ReferenceValue
    extends: {
      _type: 'api.extend'
      type: Sanity.ArrayItem<APIToken>[]
    }[]
    members: Sanity.ArrayItem<APIInterfaceMember>[]
    package: Sanity.ReferenceValue
    release: Sanity.ReferenceValue
    typeParameters: Sanity.ArrayItem<APITypeParameter>[]
  }

  /** @public */
  export interface APICallSignature
    extends Omit<ResolvedAPICallSignature, 'parameters' | 'returnType' | 'typeParameters'> {
    parameters: Sanity.ArrayItem<APIParameter>[]
    returnType: Sanity.ArrayItem<APIToken>[]
    typeParameters: Sanity.ArrayItem<APITypeParameter>[]
  }

  /** @public */
  export interface APIConstructSignature
    extends Omit<ResolvedAPIConstructSignature, 'parameters' | 'returnType' | 'typeParameters'> {
    parameters: Sanity.ArrayItem<APIParameter>[]
    returnType: Sanity.ArrayItem<APIToken>[]
    typeParameters: Sanity.ArrayItem<APITypeParameter>[]
  }

  /** @public */
  export interface APIMethodSignature
    extends Omit<ResolvedAPIMethodSignature, 'parameters' | 'returnType' | 'typeParameters'> {
    parameters: Sanity.ArrayItem<APIParameter>[]
    returnType: Sanity.ArrayItem<APIToken>[]
    typeParameters: Sanity.ArrayItem<APITypeParameter>[]
  }

  /** @public */
  export interface APIPropertySignature extends Omit<ResolvedAPIPropertySignature, 'type'> {
    type: Sanity.ArrayItem<APIToken>[]
  }

  /** @public */
  export interface APIIndexSignature
    extends Omit<ResolvedAPIIndexSignature, 'parameters' | 'returnType'> {
    parameters: Sanity.ArrayItem<APIParameter>[]
    returnType: Sanity.ArrayItem<APIToken>[]
  }

  /** @public */
  export type APIInterfaceMember =
    | APICallSignature
    | APIConstructSignature
    | APIMethodSignature
    | APIPropertySignature
    | APIIndexSignature

  /** @public */
  export interface APIConstructor extends Omit<ResolvedAPIConstructor, 'parameters'> {
    parameters: Sanity.ArrayItem<APIParameter>[]
  }

  /** @public */
  export interface APIPropertyMember extends Omit<ResolvedAPIProperty, 'type'> {
    type: Sanity.ArrayItem<APIToken>[]
  }

  /** @public */
  export interface APIMethodMember
    extends Omit<ResolvedAPIMethod, 'parameters' | 'returnType' | 'typeParameters'> {
    parameters: Sanity.ArrayItem<APIParameter>[]
    returnType: Sanity.ArrayItem<APIToken>[]
    typeParameters: Sanity.ArrayItem<APITypeParameter>[]
  }

  /** @public */
  export type APIClassMember = APIConstructor | APIPropertyMember | APIMethodMember

  /**
   * All API member types.
   *
   * @public
   */
  export type APIMember =
    | APIClass
    | APIEnum
    | APIFunction
    | APIInterface
    | APINamespace
    | APITypeAlias
    | APIVariable
}
