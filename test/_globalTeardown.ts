import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import {promisify} from 'util'
import rimraf from 'rimraf'

const _rimraf = promisify(rimraf)

export default async () => {
  const lockfile = await readFile(path.resolve(__dirname, '__tmp__/pnpm-lock.yaml'))

  // Restore the lockfile
  await writeFile(path.resolve(__dirname, '../pnpm-lock.yaml'), lockfile)

  await _rimraf(path.resolve(__dirname, '__tmp__'))
}
