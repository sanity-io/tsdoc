import path from 'path'
import {extract, load, transform} from '../src/tsdoc'
import {_spawnProject} from './env'

describe('load', () => {
  jest.setTimeout(10000)

  test('should ...', async () => {
    const project = await _spawnProject('mylib/1.0.0')

    const results = await extract(project.cwd)

    const docs = transform(results, {package: {version: '1.0.0'}})

    await load(docs, {fs: {path: path.resolve(project.cwd, 'etc/1.0.0.json')}})
  })
})
