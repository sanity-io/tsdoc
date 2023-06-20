import {TSDocAppParams} from '@sanity/tsdoc/store'

/** @beta */
export function parsePath(
  path: string,
  options: {basePath?: string; version?: string} = {}
): TSDocAppParams {
  const {basePath = '', version = '0.0.0'} = options
  const baseSegments = basePath.split('/').filter(Boolean)
  const segments = path.split('/').filter(Boolean).slice(baseSegments.length)

  let packageScope: string | null = null
  let packageName: string | null = null
  let releaseVersion: string | null = null
  let exportPath: string | null = null
  let memberSlug: string | null = null

  packageName = segments.shift() || null

  if (packageName?.startsWith('@')) {
    packageScope = packageName
    packageName = segments.shift() || null
  }

  if (packageName) {
    releaseVersion = version
  }

  if (releaseVersion) {
    if (segments.length > 1) {
      memberSlug = segments.pop() || null
      exportPath = `./${segments.join('/')}`
    } else if (segments.length === 1) {
      // needs to be this since if the last element is popped then the export path needs to be "empty"
      memberSlug = segments.pop() || null
      exportPath = `.`
    }
  }

  const params: TSDocAppParams = {
    exportPath,
    packageName,
    packageScope,
    releaseVersion,
    memberSlug,
  }

  return params
}
