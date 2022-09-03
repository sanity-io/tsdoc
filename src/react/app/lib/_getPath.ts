import {TSDocAppParams} from '../../types'

/** @internal */
export function _getPath(params: TSDocAppParams): string {
  return (
    '/' +
    [
      params.packageScope,
      params.packageName,
      params.releaseVersion,
      params.exportPath === '.' ? 'index' : params.exportPath,
      params.memberName,
    ]
      .filter(Boolean)
      .join('/')
  )
}
