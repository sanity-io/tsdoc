import {_spawnProject} from './_spawnProject'

describe('cli', () => {
  jest.setTimeout(60000)

  test('run `etl` command', async () => {
    const project = await _spawnProject('mylib')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'node_modules', 'src'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'etc', 'node_modules', 'src'])

    expect(stdout).toContain('wrote 17 documents to etc/mylib/1.0.0.json')
  })

  test('run `etl` command in `multi-export`', async () => {
    const project = await _spawnProject('multi-export')

    await project.install()
    await project.run('build')

    expect(await project.dirs()).toEqual(['dist', 'exports', 'node_modules', 'src'])
    expect(await project.dirs('dist')).toEqual(['exports'])

    const {stdout} = await project.run('etl')

    expect(await project.dirs()).toEqual(['dist', 'etc', 'exports', 'node_modules', 'src'])
    expect(await project.dirs('dist')).toEqual(['exports'])

    expect(stdout).toContain('wrote 10 documents to etc/multi-export/1.0.0.json')
  })
})
