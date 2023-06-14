import {TSDocAppParams} from '@sanity/tsdoc/store'

/** @beta */
export function parsePath(path: string, options: {basePath?: string} = {}): TSDocAppParams {
  const {basePath = ''} = options
  const baseSegments = basePath.split('/').filter(Boolean)
  const segments = path.split('/').filter(Boolean).slice(baseSegments.length)

  let packageScope: string | null = null
  let packageName: string | null = null
  let releaseVersion: string | null = null
  let exportPath: string | null = null
  let memberName: string | null = null
  let memberSlug: string | null = null

  packageName = segments.shift() || null

  if (packageName?.startsWith('@')) {
    packageScope = packageName
    packageName = segments.shift() || null
  }

  if (packageName) {
    releaseVersion = segments.shift() || null
  }

  if (releaseVersion) {
    if (segments.length > 1) {
      memberName = segments.pop() || null
      memberSlug = memberName?.toLocaleLowerCase() || null
      exportPath = `./${segments.join('/')}`
    } else if (segments.length === 1) {
      exportPath = `./${segments[0]}`
    }
  }

  if (exportPath === './index') {
    exportPath = '.'
  }

  const params: TSDocAppParams = {
    exportPath,
    memberName,
    packageName,
    packageScope,
    releaseVersion,
    memberSlug,
  }

  return params
}
