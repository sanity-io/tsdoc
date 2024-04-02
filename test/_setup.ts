import {readFile, writeFile} from 'node:fs/promises'
import path from 'node:path'
import {promisify} from 'node:util'
import cpx from 'cpx'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'

const _copy = promisify(cpx.copy)

export async function setup() {
  await mkdirp(path.resolve(__dirname, '__tmp__'))

  // Backup the lockfile so we can restore it after testing (see `_globalTeardown.ts`)
  await _copy(path.resolve(__dirname, '../pnpm-lock.yaml'), path.resolve(__dirname, '__tmp__'))

  return async () => {
    const lockfile = await readFile(path.resolve(__dirname, '__tmp__/pnpm-lock.yaml'))

    // Restore the lockfile
    await writeFile(path.resolve(__dirname, '../pnpm-lock.yaml'), lockfile)

    await rimraf(path.resolve(__dirname, '__tmp__'))
  }
}
