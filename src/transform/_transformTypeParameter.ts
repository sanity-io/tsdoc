import {
  ApiCallSignature,
  ApiFunction,
  ApiInterface,
  ApiTypeAlias,
  TypeParameter,
} from '@microsoft/api-extractor-model'
import {Sanity} from '../_lib/sanity'
import {Serialized} from '../types'
import {_transformTokens} from './_transformTokens'
import {TransformContext} from './types'

export function _transformTypeParameter(
  ctx: TransformContext,
  node: ApiCallSignature | ApiFunction | ApiInterface | ApiTypeAlias,
  p: TypeParameter,
  idx: number
): Sanity.ArrayItem<Serialized.APITypeParameter> {
  return {
    _type: 'api.typeParameter',
    _key: `typeParameter${idx}`,
    name: p.name,
    constraintType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.constraintExcerpt.tokenRange.startIndex,
        p.constraintExcerpt.tokenRange.endIndex
      )
    ),
    defaultType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        p.defaultTypeExcerpt.tokenRange.startIndex,
        p.defaultTypeExcerpt.tokenRange.endIndex
      )
    ),
  }
}
