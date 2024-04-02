import path from 'path'
import {ExtractResult} from '../extract'
import {
  APIDocument,
  APIExportDocument,
  APIPackageDocument,
  APIReleaseDocument,
  APISymbolDocument,
  SerializedAPIMember,
} from '../types'
import {_isRecord, _parsePackageName} from './helpers'
import {transformExportMember} from './transformExportMember'
import {_transformPackage} from './transformPackage'
import {TransformContext, TransformOpts} from './types'

function formatReleaseId(
  packageScope: string | undefined,
  packageName: string,
  releaseVersion: string,
) {
  return [packageScope, packageName, releaseVersion]
    .filter(Boolean)
    .join('_')
    .replace(/@/g, '')
    .replace(/\./g, '-')
    .replace(/\//g, '_')
}

function formatExportId(
  packageScope: string | undefined,
  packageName: string,
  releaseVersion: string,
  exportPath: string,
) {
  const prefix = [packageScope, packageName, releaseVersion].filter(Boolean).join('_')

  return path
    .join(prefix, exportPath === '.' ? './_main' : exportPath)
    .replace(/@/g, '')
    .replace(/\./g, '-')
    .replace(/\//g, '_')
}

/** @public */
export function transform(extractResults: ExtractResult[], opts: TransformOpts): APIDocument[] {
  const {version: releaseVersion} = opts.package

  const state: {
    exports: APIExportDocument[]
    members: (SerializedAPIMember & {_id: string})[]
    package?: APIPackageDocument
    release?: APIReleaseDocument
    memberNames: string[]
    symbols: APISymbolDocument[]
  } = {
    exports: [],
    members: [],
    package: opts.currPackageDoc || undefined,
    release: undefined,
    memberNames: [],
    symbols: [],
  }

  for (const extractResult of extractResults) {
    const {apiPackage, exportPath} = extractResult

    if (!apiPackage) {
      // skip failed
      continue
    }

    const [packageScope, packageName] = _parsePackageName(apiPackage.name)

    const releaseId = formatReleaseId(packageScope, packageName, releaseVersion)

    const exportId = formatExportId(packageScope, packageName, releaseVersion, exportPath)

    const exportDoc: APIExportDocument = {
      _id: `tsdoc-${exportId}`,
      _type: 'api.export',
      package: {_type: 'reference', _ref: ''},
      release: {_type: 'reference', _ref: ''},
      members: [],
      name: resolveExportId(packageScope, packageName, exportPath),
      path: exportPath || '.',
    }

    const ctx: TransformContext = {
      apiPackage,
      scope: packageScope,
      name: packageName,
      version: releaseVersion,
      package: state.package,
      release: state.release,
      export: exportDoc,
    }

    const packageDoc = _transformPackage(ctx, apiPackage)

    exportDoc.package._ref = packageDoc._id

    ctx.package = packageDoc

    ctx.release = {
      exports: [],
      memberNames: [],
      ...ctx.release,
      _type: 'api.release',
      _id: `tsdoc-${releaseId}`,
      package: {_type: 'reference', _ref: ctx.package._id},
      version: releaseVersion,
    }

    exportDoc.release._ref = ctx.release._id

    state.exports.push(exportDoc)

    ctx.release.exports.push({
      _type: 'reference',
      _key: exportDoc._id,
      _ref: exportDoc._id,
    })

    ctx.package.latestRelease = {_type: 'reference', _ref: ctx.release._id}

    ctx.package.releases.push({
      _key: ctx.release._id,
      _type: 'reference',
      _ref: ctx.release._id,
    })

    for (const member of apiPackage.members[0]?.members || []) {
      const memberDoc = transformExportMember(ctx, member)

      state.members.push(memberDoc)

      exportDoc.members.push({
        _key: memberDoc._id,
        _type: 'reference',
        _ref: memberDoc._id,
      })

      const symbolDoc: APISymbolDocument = {
        _type: 'api.symbol',
        _id: `tsdoc-${packageDoc._id}_${member.displayName}`,
        name: member.displayName,
        package: {_type: 'reference', _ref: packageDoc._id},
      }

      const hasSymbol = state.symbols.some((s) => s.name === symbolDoc.name)

      if (!hasSymbol) state.symbols.push(symbolDoc)

      if (!ctx.release.memberNames.includes(symbolDoc.name)) {
        ctx.release.memberNames.push(symbolDoc.name)
      }
    }

    // keep these references
    state.package = ctx.package
    state.release = ctx.release
  }

  const result: APIDocument[] = []

  if (state.package) result.push(state.package)
  if (state.release) result.push(state.release)

  result.push(...state.exports, ...state.members, ...state.symbols)

  // Remove references to non-existing documents
  for (const doc of result) {
    _removeNonExistingRefs(doc as unknown as Record<string, unknown>, result)
  }

  return result
}

function resolveExportId(
  packageScope: string | undefined,
  packageName: string,
  exportPath: string | undefined,
) {
  const packageId = [packageScope, packageName].filter(Boolean).join('/')

  return path.join(packageId, exportPath || '.')
}

function _removeNonExistingRefs(source: Record<string, unknown>, docs: APIDocument[]) {
  for (const [key, value] of Object.entries(source)) {
    if (_isRecord(value)) {
      if (value['_ref'] === '$$unknown$$') {
        const doc = docs.find((d) => {
          return 'name' in d && d.name === source['text']
        })

        if (!doc) {
          delete source[key]
        }

        value['_ref'] = doc?._id

        continue
      }

      if (value['_type'] === 'reference') {
        const exists = docs.some((d) => d._id === value['_ref'])

        if (!exists) {
          delete source[key]
        }
      } else {
        _removeNonExistingRefs(value, docs)
      }
    }
  }
}
