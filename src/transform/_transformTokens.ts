import {ExcerptToken} from '@microsoft/api-extractor-model'
import {Sanity} from '../_lib/sanity'
import {Serialized} from '../types'
import {hash} from './helpers'
import {TransformContext} from './types'

export function _transformTokens(
  ctx: TransformContext,
  tokens: ExcerptToken[]
): Sanity.ArrayItem<Serialized.APIToken>[] {
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

      const key = t.canonicalReference.toString().replace('~', '')

      return {
        _type: 'api.token',
        _key: `token${idx}`,
        text: t.text,
        member: {
          _type: 'reference',
          _ref: hash(key),
        },
      }
    }

    throw new Error(`tokens: unknown type: ${t.kind}`)
  })
}
