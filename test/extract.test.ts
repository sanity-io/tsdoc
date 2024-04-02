import {createRequire} from 'node:module'
import path from 'node:path'

import {describe, expect, test, vi} from 'vitest'

import {_spawnProject} from './_spawnProject'

const require = createRequire(import.meta.url)
// @sanity/tsdoc is currently designed to be used in a CJS process
const {extract} = require('@sanity/tsdoc')

describe('extract', () => {
  vi.setConfig({testTimeout: 60000})

  test('should extract package with only root export', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    const {results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
      strict: true,
      legacyExports: true,
      tsconfig: 'tsconfig.dist.json',
    })

    const result = results[0]!

    expect(result.messages[result.messages.length - 1]?.text).toEqual(
      `Writing: ${path.resolve(result.tempDirPath, 'api.json')}`,
    )
  })

  test('should extract package with multiple exports', async () => {
    const project = await _spawnProject('multi-export')

    await project.install()
    await project.run('build')

    const {results} = await extract({
      customTags: [{name: 'sampleCustomBlockTag', syntaxKind: 'block', allowMultiple: true}],
      packagePath: project.cwd,
      strict: true,
      legacyExports: false,
      tsconfig: 'tsconfig.dist.json',
    })

    expect(results.length).toBe(2)

    const result = results[0]!

    expect(result.messages[result.messages.length - 1]?.text).toEqual(
      `Writing: ${path.resolve(result.tempDirPath, 'api.json')}`,
    )
  })
})
