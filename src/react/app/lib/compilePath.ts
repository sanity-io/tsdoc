import {TSDocAppParams} from '@sanity/tsdoc/store'

/** @beta */
export function compilePath(params: TSDocAppParams): string {
  const segments: string[] = []

  if (params.packageName) {
    if (params.packageScope) {
      segments.push(params.packageScope)
    }

    segments.push(params.packageName)

    if (params.releaseVersion) {
      segments.push(params.releaseVersion)

      if (params.exportPath) {
        segments.push(params.exportPath === '.' ? 'index' : params.exportPath.slice(2))

        if (params.memberName) {
          segments.push(params.memberName)
        }
      }
    }
  }

  return `/${segments.join('/')}`
}
