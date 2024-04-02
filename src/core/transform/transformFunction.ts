import {ApiFunction} from '@microsoft/api-extractor-model'
import {SerializedAPIFunction} from '../types'
import {_functionIsReactComponentType} from './_functionIsReactComponentType'
import {_functionIsReactHook} from './_functionIsReactHook'
import {_functionPropsType} from './_functionReactComponentPropsType'
import {_transformParameter} from './_transformParameter'
import {_transformTokens} from './_transformTokens'
import {_transformTypeParameter} from './_transformTypeParameter'
import {RELEASE_TAGS} from './constants'
import {_sanitizeName, _slugify} from './helpers'
import {_transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformFunction(
  ctx: TransformContext,
  node: ApiFunction,
): SerializedAPIFunction {
  if (!ctx.export) {
    throw new Error('transformFunction: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformFunction: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformFunction: missing `release` document')
  }

  const docComment = node.tsdocComment
  const name = _sanitizeName(node.name)
  const isReactComponentType = _functionIsReactComponentType(node)
  const isReactHook = _functionIsReactHook(node)
  const propsType = isReactComponentType ? _functionPropsType(ctx, node) : undefined

  return {
    _type: 'api.function',
    comment: docComment ? _transformDocComment(docComment) : undefined,
    export: {_type: 'reference', _ref: ctx.export._id},
    isReactComponentType,
    isReactHook,
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    parameters: node.parameters.map((p, idx) => _transformParameter(ctx, node, p, idx)),
    propsType,
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
    returnType: _transformTokens(
      ctx,
      node.excerptTokens.slice(
        node.returnTypeExcerpt.tokenRange.startIndex,
        node.returnTypeExcerpt.tokenRange.endIndex,
      ),
    ),
    typeParameters: node.typeParameters.map((p, idx) => _transformTypeParameter(ctx, node, p, idx)),
    isOverloading: node.overloadIndex > 1,
  }
}
