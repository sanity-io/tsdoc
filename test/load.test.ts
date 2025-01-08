import {createRequire} from 'node:module'
import path from 'node:path'

import {describe, test, vi} from 'vitest'

import {_spawnProject} from './_spawnProject'

const require = createRequire(import.meta.url)
// @sanity/tsdoc is currently designed to be used in a CJS process
const {extract, load, transform} = require('@sanity/tsdoc')

describe('load', () => {
  vi.setConfig({testTimeout: 60000})

  test('should ...', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({
      packagePath: project.cwd,
      strict: true,
    })

    const docs = transform(results, {package: {version: pkg.version}})

    await load(docs, {
      cwd: project.cwd,
      fs: {path: path.resolve(project.cwd, `etc/${pkg.version}.json`)},
    })
  })
})
