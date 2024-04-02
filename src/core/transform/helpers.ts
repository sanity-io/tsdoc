import crypto from 'crypto'
import slugify from 'slugify'

import {TransformContext} from './types'

export function _hash(key: string): string {
  return crypto.createHash('md5').update(key).digest('hex')
}

export function _createExportMemberId(_ctx: TransformContext, key: string): string {
  return _hash(key)
}

export function _isArray(val: unknown): val is unknown[] {
  return Array.isArray(val)
}

export function _isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && Boolean(val)
}

export function _sanitizeName(str: string): string {
  // Since `Text` is part of the default browser scope, API extractor will append `_2` to other
  // implementations. So we need to replace it for the case of readable docs.
  if (str === 'Text_2') {
    return 'Text'
  }

  return str
}

export function _slugify(str: string): string {
  return slugify(str)
}

export function _parsePackageName(nameStr: string): [string | undefined, string] {
  const p = nameStr.split('/')

  const packageScope = p.length > 1 ? p[0] : undefined
  const packageName = p.length > 1 ? p[1] : p[0]

  if (!packageName) {
    throw new Error(`Invalid package name: ${nameStr}`)
  }

  return [packageScope, packageName]
}
