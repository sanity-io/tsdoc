/* eslint-disable no-console */

import {readdir, readFile} from 'fs/promises'
import path from 'path'
import {promisify} from 'util'
import cpx from 'cpx'
import mkdirp from 'mkdirp'
import rimraf from 'rimraf'
import {v4 as uuid} from 'uuid'
import {_fileExists} from '../src/core/_lib/_fileExists'
import {_exec} from './_exec'
import {_ExecError} from './_ExecError'

const _copy = promisify(cpx.copy)

async function _tmpWorkspace() {
  const key = uuid()
  const workspacePath = path.resolve(__dirname, `__tmp__/${key}`)

  await mkdirp(workspacePath)

  return {
    path: workspacePath,
    remove: () => rimraf(workspacePath),
  }
}

export async function _spawnProject(name: string): Promise<{
  cwd: string
  add: (pkg: string) => Promise<{stdout: string; stderr: string}>
  dirs: (relativePath?: string) => Promise<string[]>
  install: () => Promise<{stdout: string; stderr: string}>
  pack: () => Promise<{path: string}>
  readFile: (filePath: string) => Promise<string>
  remove: () => void
  require: (id: string) => any
  run: (cmd: string) => Promise<{stdout: string; stderr: string}>
}> {
  const {path: tmpPath, remove: tmpRemove} = await _tmpWorkspace()
  const sourcePackagePath = path.resolve(__dirname, '../playground', name)

  if (!_fileExists(sourcePackagePath)) {
    throw new Error(`playground project not found: ${name}`)
  }

  await _copy(path.resolve(sourcePackagePath, '**/*'), tmpPath)

  // clean
  await rimraf(path.resolve(tmpPath, 'dist'))
  await rimraf(path.resolve(tmpPath, 'etc'))

  const packageJsonPath = path.resolve(tmpPath, 'package.json')

  if (!_fileExists(packageJsonPath)) {
    throw new Error(`failed to spawn project: ${name}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(packageJsonPath)

  async function runExec(cmd: string) {
    try {
      return _exec(cmd, {cwd: tmpPath})
    } catch (execErr) {
      if (execErr instanceof _ExecError) {
        console.log(execErr.stdout)
        console.error(execErr.stderr)

        return {stdout: execErr.stdout, stderr: execErr.stderr}
      }

      throw execErr
    }
  }

  async function dirs(relativePath?: string) {
    const dirPath = path.resolve(tmpPath, relativePath || '.')

    const files = await readdir(dirPath, {withFileTypes: true})

    return files.filter((f) => f.isDirectory()).map((f) => f.name)
  }

  return {
    cwd: tmpPath,
    add: (id: string) => runExec(`pnpm add ${id}`),
    dirs,
    install: () => runExec('pnpm install --no-frozen-lockfile'),
    pack: async () => {
      await runExec('pnpm pack')

      return {path: path.resolve(tmpPath, `${pkg.name}-${pkg.version}.tgz`)}
    },
    readFile: (filePath: string) =>
      readFile(path.resolve(tmpPath, filePath)).then((r) => r.toString()),
    remove: () => setTimeout(() => tmpRemove(), 0),
    require: (id) => require(path.resolve(tmpPath, id)),
    run: (cmd: string) => runExec(`pnpm run ${cmd}`),
  }
}
