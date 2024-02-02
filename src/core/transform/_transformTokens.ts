import {ExcerptToken} from '@microsoft/api-extractor-model'
import {SanityArrayItem} from '../_lib/sanity'
import {SerializedAPIToken} from '../types'
import {_hash} from './helpers'
import {TransformContext} from './types'

export function _transformTokens(
  ctx: TransformContext,
  tokens: ExcerptToken[]
): SanityArrayItem<SerializedAPIToken>[] {
  const pkg = ctx.package

  if (!pkg) {
    throw new Error('transformTokens: missing package document')
  }

  return tokens.map((t, idx) => {
    if (t.kind === 'Content') {
      return {
        _type: 'api.token',
        _key: `token${idx}`,
        text: t.text,
      }
    }

    if (t.kind === 'Reference') {
      if (!t.canonicalReference || !t.canonicalReference.source) {
        return {
          _type: 'api.token',
          _key: `token${idx}`,
          text: t.text,
        }
      }

      return {
        _type: 'api.token',
        _key: `token${idx}`,
        text: t.text,
        member: {
          _type: 'reference',
          _ref: _getTokenId(t),
        },
      }
    }

    throw new Error(`tokens: unknown type: ${t.kind}`)
  })
}

function _getTokenId(t: ExcerptToken) {
  const _ref = t.canonicalReference?.toString()

  if (_ref === '!unknown') {
    return '$$unknown$$'
  }

  return `tsdoc-${_hash(_ref?.replace('~', '') || '')}`
}
