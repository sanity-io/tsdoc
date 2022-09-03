import {
  ApiClass,
  ApiEnum,
  ApiFunction,
  ApiInterface,
  ApiItem,
  ApiNamespace,
  ApiTypeAlias,
  ApiVariable,
} from '@microsoft/api-extractor-model'
import {Serialized} from '../types'
import {hash} from './helpers'
import {_transformClass} from './transformClass'
import {_transformEnum} from './transformEnum'
import {_transformFunction} from './transformFunction'
import {_transformInterface} from './transformInterface'
import {_transformNamespace} from './transformNamespace'
import {_transformTypeAlias} from './transformTypeAlias'
import {_transformVariable} from './transformVariable'
import {TransformContext} from './types'

/**
 * @internal
 */
export function transformExportMember(
  ctx: TransformContext,
  item: ApiItem
): Serialized.APIMember & {_id: string} {
  const key = item.canonicalReference.toString()

  if (item.kind === 'Class') {
    return {_id: hash(key), ..._transformClass(ctx, item as ApiClass)}
  }

  if (item.kind === 'Enum') {
    return {_id: hash(key), ..._transformEnum(ctx, item as ApiEnum)}
  }

  if (item.kind === 'Function') {
    return {_id: hash(key), ..._transformFunction(ctx, item as ApiFunction)}
  }

  if (item.kind === 'Interface') {
    return {_id: hash(key), ..._transformInterface(ctx, item as ApiInterface)}
  }

  if (item.kind === 'Namespace') {
    return {_id: hash(key), ..._transformNamespace(ctx, item as ApiNamespace)}
  }

  if (item.kind === 'TypeAlias') {
    return {_id: hash(key), ..._transformTypeAlias(ctx, item as ApiTypeAlias)}
  }

  if (item.kind === 'Variable') {
    return {_id: hash(key), ..._transformVariable(ctx, item as ApiVariable)}
  }

  throw new Error(`package: unknown member type: ${item.kind}`)
}
