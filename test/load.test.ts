import path from 'path'
import {extract, load, transform} from '@sanity/tsdoc'
import {_spawnProject} from './_spawnProject'

describe('load', () => {
  jest.setTimeout(60000)

  test('should ...', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const results = await extract({packagePath: project.cwd})

    const docs = transform(results, {package: {version: '1.0.0'}})

    await load(docs, {fs: {path: path.resolve(project.cwd, 'etc/1.0.0.json')}})
  })
})
