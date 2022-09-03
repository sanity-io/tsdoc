import path from 'path'
import {extract} from '../src/tsdoc'
import {_spawnProject} from './env'
import {_ExecError} from './env/_ExecError'

describe('extract', () => {
  jest.setTimeout(10000)

  test('should extract package with only root export', async () => {
    const project = await _spawnProject('mylib/1.0.0')

    const results = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      tsconfigPath: 'tsconfig.json',
    })

    const result = results[0]

    project.remove()

    expect(result.messages[result.messages.length - 1].text).toEqual(
      `Writing: ${path.resolve(result.tempDirPath, 'api.json')}`
    )
  })

  test.only('should extract package with multiple exports', async () => {
    const project = await _spawnProject('multi-export/1.0.0')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['lib', 'node_modules', 'src'])
    expect(await project.dirs('lib')).toEqual(['cjs', 'dts', 'esm'])

    const results = await extract(project.cwd, {
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      tsconfigPath: 'tsconfig.lib.json',
    })

    expect(results.length).toBe(2)

    const result = results[0]

    project.remove()

    expect(result.messages[result.messages.length - 1].text).toEqual(
      `Writing: ${path.resolve(result.tempDirPath, 'api.json')}`
    )
  })

  // test('should break', async () => {
  //   const project = await _spawnProject('mylib/1.0.1-broken')

  //   let error: Error | null = null

  //   try {
  //     await extract('lib/esm/index.d.ts', {
  //       customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
  //       packagePath: project.path,
  //       tsconfigPath: 'tsconfig.json',
  //     })
  //   } catch (e: any) {
  //     error = e
  //   }

  //   expect(error?.message).toContain(
  //     'The expression contains an import() type, which is not yet supported by API Extractor:'
  //   )

  //   project.cleanup()
  // })
})
