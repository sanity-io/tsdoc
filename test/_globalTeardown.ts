import {readFile, writeFile} from 'fs/promises'
import path from 'path'
import rimraf from 'rimraf'

export default async () => {
  const lockfile = await readFile(path.resolve(__dirname, '__tmp__/pnpm-lock.yaml'))

  // Restore the lockfile
  await writeFile(path.resolve(__dirname, '../pnpm-lock.yaml'), lockfile)

  await rimraf(path.resolve(__dirname, '__tmp__'))
}
