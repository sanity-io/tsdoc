/* eslint-disable no-console */

import {readdir, readFile} from 'fs/promises'
import path from 'path'
import cpx from 'cpx'
import tmp from 'tmp'
import {_exec} from './_exec'
import {_ExecError} from './_ExecError'

export function _spawnProject(name: string): Promise<{
  cwd: string
  add: (pkg: string) => Promise<{stdout: string; stderr: string}>
  dirs: (relativePath?: string) => Promise<string[]>
  install: () => Promise<{stdout: string; stderr: string}>
  pack: () => Promise<{path: string}>
  readFile: (filePath: string) => Promise<string>
  remove: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  require: (id: string) => any
  run: (cmd: string) => Promise<{stdout: string; stderr: string}>
}> {
  return new Promise((resolve, reject) => {
    tmp.dir((err, tmpPath, tmpRemove) => {
      if (err) {
        reject(err)

        return
      }

      const packagePath = path.resolve(__dirname, '../__fixtures__', name)

      cpx.copy(path.resolve(packagePath, '**/*'), tmpPath, (cpxErr) => {
        if (cpxErr) {
          reject(cpxErr)

          return
        }

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const pkg = require(path.resolve(tmpPath, 'package.json'))

        async function runExec(cmd: string) {
          try {
            const env = {
              ...process.env,
              PATH: `${process.env.PATH}:${path.resolve(__dirname, '../../bin')}`,
            }

            return _exec(cmd, {cwd: tmpPath, env})
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

        resolve({
          cwd: tmpPath,
          add: (id: string) => runExec(`yarn add ${id}`),
          dirs,
          install: () => runExec('yarn install'),
          pack: async () => {
            await runExec('yarn pack')

            return {path: path.resolve(tmpPath, `${pkg.name}-${pkg.version}.tgz`)}
          },
          readFile: (filePath: string) =>
            readFile(path.resolve(tmpPath, filePath)).then((r) => r.toString()),
          remove: () => setTimeout(() => tmpRemove(), 0),
          require: (id) => require(path.resolve(tmpPath, id)),
          run: async (cmd: string) => {
            try {
              return await runExec(`yarn run ${cmd}`)
            } catch (err) {
              if (err instanceof _ExecError) {
                console.log(err.stdout)
                console.log(err.stderr)
              }

              throw err
            }
          },
        })
      })
    })
  })
}
