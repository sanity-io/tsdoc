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
      if (params.exportPath) {
        if (params.exportPath !== '.') {
          segments.push(params.exportPath.slice(2))
        }

        if (params.memberSlug) {
          segments.push(params.memberSlug)
        }
      }
    }
  }

  return `/${segments.join('/')}`
}
