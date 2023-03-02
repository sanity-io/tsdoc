import path from 'path'
import {SanityDocument, createClient} from '@sanity/client'
import mkdirp from 'mkdirp'
import {APIDocument} from '../types'
import {writeFile} from './helpers'

/**
 * @public
 */
export async function load(
  transformed: APIDocument[],
  opts: {
    cwd: string
    fs?: {path: string}
    sanity?: {projectId?: string; dataset?: string; token?: string}
  }
): Promise<void> {
  // Write to file system
  if (opts.fs) {
    const dirPath = path.dirname(opts.fs.path)

    await mkdirp(dirPath)
    await writeFile(opts.fs.path, JSON.stringify(transformed, null, 2) + '\n')
  }

  // Write to Sanity
  if (opts.sanity && opts.sanity.token) {
    await _loadToSanity(opts.sanity, transformed)
  }
}

async function _loadToSanity(
  sanity: {projectId?: string; dataset?: string; token?: string},
  docs: APIDocument[]
): Promise<void> {
  const client = createClient({
    ...sanity,
    apiVersion: '2022-10-01',
    token: sanity.token,
    useCdn: false,
  })

  let tx = client.transaction()

  for (const doc of docs) {
    tx = tx.createOrReplace(doc as SanityDocument)
  }

  await tx.commit()
}
