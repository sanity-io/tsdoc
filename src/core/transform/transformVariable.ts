import {ApiVariable} from '@microsoft/api-extractor-model'

import {SanityReferenceValue} from '../_lib/sanity'
import {SerializedAPIVariable} from '../types'
import {_transformTokens} from './_transformTokens'
import {RELEASE_TAGS} from './constants'
import {_createExportMemberId, _sanitizeName, _slugify} from './helpers'
import {_transformDocComment} from './transformDocComment'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformVariable(
  ctx: TransformContext,
  node: ApiVariable,
): SerializedAPIVariable {
  if (!ctx.export) {
    throw new Error('transformVariable: missing `export` document')
  }

  if (!ctx.package) {
    throw new Error('transformVariable: missing `package` document')
  }

  if (!ctx.release) {
    throw new Error('transformVariable: missing `release` document')
  }

  const name = _sanitizeName(node.name)
  const docComment = node.tsdocComment
  const comment = docComment ? _transformDocComment(docComment) : undefined
  const type = _transformTokens(
    ctx,
    node.excerptTokens.slice(
      node.variableTypeExcerpt.tokenRange.startIndex,
      node.variableTypeExcerpt.tokenRange.endIndex,
    ),
  )
  const isReactComponentType = _variableIsReactComponentType(node)
  const propsType = isReactComponentType ? _variablePropsType(ctx, node) : undefined

  return {
    _type: 'api.variable',
    comment,
    export: {_type: 'reference', _ref: ctx.export._id},
    isReactComponentType,
    name,
    package: {_type: 'reference', _ref: ctx.package._id},
    propsType,
    release: {_type: 'reference', _ref: ctx.release._id},
    releaseTag: RELEASE_TAGS[node.releaseTag],
    slug: {_type: 'slug', current: _slugify(name)},
    type,
  }
}

function _variableIsReactComponentType(node: ApiVariable) {
  const typeTokens = node.excerptTokens.slice(
    node.variableTypeExcerpt.tokenRange.startIndex,
    node.variableTypeExcerpt.tokenRange.endIndex,
  )

  const typeCode = typeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const isNamedExoticComponent =
    typeCode.startsWith('React.NamedExoticComponent<') ||
    typeCode.startsWith('React_2.NamedExoticComponent<') ||
    typeCode.startsWith('NamedExoticComponent<')
  const isForwardRefExoticComponent =
    typeCode.startsWith('React.ForwardRefExoticComponent<') ||
    typeCode.startsWith('React_2.ForwardRefExoticComponent<') ||
    typeCode.startsWith('ForwardRefExoticComponent<')
  const isMemoExoticComponent =
    typeCode.startsWith('React.MemoExoticComponent<') ||
    typeCode.startsWith('React_2.MemoExoticComponent<') ||
    typeCode.startsWith('MemoExoticComponent<')
  const isStyledComponent = typeCode.startsWith('StyledComponent<')
  const returnsReactElement =
    typeCode.endsWith('=> React.ReactElement') ||
    typeCode.endsWith('=> React_2.ReactElement') ||
    typeCode.endsWith('=> ReactElement') ||
    typeCode.endsWith('=> JSX.Element')

  if (
    isNamedExoticComponent ||
    isForwardRefExoticComponent ||
    isMemoExoticComponent ||
    isStyledComponent ||
    returnsReactElement
  ) {
    return true
  }

  return false
}

function _variablePropsType(
  ctx: TransformContext,
  node: ApiVariable,
): SanityReferenceValue | undefined {
  const typeTokens = node.excerptTokens.slice(
    node.variableTypeExcerpt.tokenRange.startIndex,
    node.variableTypeExcerpt.tokenRange.endIndex,
  )

  const componentRef = typeTokens.find((t) => t.kind === 'Reference' && t.text.endsWith('Props'))

  if (componentRef && componentRef.canonicalReference) {
    return {
      _type: 'reference',
      _ref: _createExportMemberId(ctx, componentRef.canonicalReference.toString()),
    }

    // console.log({
    //   refString: sanityUIRef.canonicalReference.toString(),
    //   ref: {
    //     _type: 'reference',
    //     _ref: _createExportMemberId(ctx, sanityUIRef.canonicalReference.toString()),
    //   },
    // })

    // return undefined
  }

  return undefined
}
