import {TSDocAppParams} from '@sanity/tsdoc/store'

/** @beta */
export function compilePath(params: TSDocAppParams): string {
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
