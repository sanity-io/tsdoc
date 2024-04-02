import path from 'node:path'
import {extract} from '@sanity/tsdoc'
import {_spawnProject} from './_spawnProject'

describe('extract', () => {
  vi.setConfig({testTimeout: 60000})

  test('should extract package with only root export', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
      tsconfig: 'tsconfig.dist.json',
    })

    const result = results[0]!

    expect(result.messages[result.messages.length - 1]?.text).toEqual(
      `Writing: ${path.resolve(result.tempDirPath, 'api.json')}`
    )
  })

  test('should extract package with multiple exports', async () => {
    const project = await _spawnProject('multi-export')

    await project.install()
    await project.run('build')

    const {results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
      tsconfig: 'tsconfig.dist.json',
    })

    expect(results.length).toBe(2)

    const result = results[0]!

    expect(result.messages[result.messages.length - 1]?.text).toEqual(
      `Writing: ${path.resolve(result.tempDirPath, 'api.json')}`
    )
  })
})
