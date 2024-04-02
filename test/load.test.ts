import path from 'node:path'
import {extract, load, transform} from '@sanity/tsdoc'
import {_spawnProject} from './_spawnProject'

describe('load', () => {
  vi.setConfig({testTimeout: 60000})

  test('should ...', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {pkg, results} = await extract({packagePath: project.cwd})

    const docs = transform(results, {package: {version: pkg.version}})

    await load(docs, {
      cwd: project.cwd,
      fs: {path: path.resolve(project.cwd, `etc/${pkg.version}.json`)},
    })
  })
})
