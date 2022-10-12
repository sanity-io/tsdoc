import {TSDocAppParams} from '../types'

/** @internal */
export function parsePath(path: string, options: {basePath?: string} = {}): TSDocAppParams | null {
  const {basePath = ''} = options
  const baseSegments = basePath.split('/').filter(Boolean)
  const segments = path.split('/').filter(Boolean).slice(baseSegments.length)

  if (segments.length === 0) return null

  const hasScope = segments[0].slice(0, 1) === '@'
  const packageScope = (hasScope && segments.shift()) || null
  const packageName = segments[0]
  const releaseVersion = segments[1]
  const exportPath = segments[2] === 'index' ? '.' : segments[2]
  const memberName = segments[3]

  return {
    exportPath,
    memberName,
    packageName,
    packageScope,
    releaseVersion,
  }
}
