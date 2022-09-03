import {ApiPackage} from '@microsoft/api-extractor-model'
import {Sanity} from '../_lib/sanity'
import {APIPackageDocument} from '../types'
import {TransformContext} from './types'

/**
 * @internal
 */
export function _transformPackage(ctx: TransformContext, node: ApiPackage): APIPackageDocument {
  const _id = node.name.replace(/@/g, '').replace(/\./g, '-').replace(/\//g, '_')

  return {
    _type: 'api.package',
    _id,
    latestRelease: ctx.package?.latestRelease as Sanity.ReferenceValue,
    name: ctx.name,
    scope: ctx.scope,
  }
}
