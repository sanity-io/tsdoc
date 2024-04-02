import {ApiFunction} from '@microsoft/api-extractor-model'
import {SanityReferenceValue} from '../_lib/sanity'
import {_transformTokens} from './_transformTokens'
import {TransformContext} from './types'

export function _functionPropsType(
  ctx: TransformContext,
  node: ApiFunction,
): SanityReferenceValue | undefined {
  const propsParam = node.parameters[0] && node.parameters[0].name === 'props' && node.parameters[0]

  if (propsParam) {
    const propsTokens = _transformTokens(
      ctx,
      node.excerptTokens.slice(
        propsParam.parameterTypeExcerpt.tokenRange.startIndex,
        propsParam.parameterTypeExcerpt.tokenRange.endIndex,
      ),
    )

    if (propsTokens.length) {
      return propsTokens[0]?.member
    }
  }

  return undefined
}
