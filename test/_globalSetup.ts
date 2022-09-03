import path from 'path'
import {promisify} from 'util'
import cpx from 'cpx'
import mkdirp from 'mkdirp'

const _copy = promisify(cpx.copy)

export default async () => {
  await mkdirp(path.resolve(__dirname, '__tmp__'))

  // Backup the lockfile so we can restore it after testing (see `_globalTeardown.ts`)
  await _copy(path.resolve(__dirname, '../pnpm-lock.yaml'), path.resolve(__dirname, '__tmp__'))
}
