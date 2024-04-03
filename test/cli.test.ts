import {describe, expect, test, vi} from 'vitest'

import {_spawnProject} from './_spawnProject'

describe('cli', () => {
  vi.setConfig({testTimeout: 60000})

  test('run `etl` command', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 25 documents to ../../etc/mylib/1.0.0.json')
  })

  test.skip('run `etl` command in `mylib-bundling-ts`', async () => {
    const project = await _spawnProject('mylib-bundling-ts')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 27 documents to ../../etc/mylib-bundling-ts/1.0.0.json')
  })

  test('run `etl` command in `multi-export`', async () => {
    const project = await _spawnProject('multi-export')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 10 documents to ../../etc/multi-export/1.0.0.json')
  })

  test('run `etl` command in `multi-export-legacy`', async () => {
    const project = await _spawnProject('multi-export-legacy')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 10 documents to ../../etc/multi-export-legacy/1.0.0.json')
  })

  test('run `etl` command in `multi-export-cjs`', async () => {
    const project = await _spawnProject('multi-export-cjs')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 10 documents to ../../etc/multi-export-cjs/1.0.0.json')
  })

  test('run `etl` command in `multi-export-cjs-legacy`', async () => {
    const project = await _spawnProject('multi-export-cjs-legacy')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 10 documents to ../../etc/multi-export-cjs-legacy/1.0.0.json')
  })
})
