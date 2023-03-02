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

  if (segments[0]?.startsWith('@')) {
    packageScope = segments.shift() || null
  }

  packageName = segments.shift() || null
  releaseVersion = segments.shift() || null
  memberName = segments.pop() || null
  exportPath = segments.join('/') || null

  return {
    exportPath: exportPath === 'index' ? '.' : `./${exportPath}`,
    memberName,
    packageName,
    packageScope,
    releaseVersion,
  }
}
