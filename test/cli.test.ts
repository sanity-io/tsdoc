import chalk from 'chalk'
import {run} from '../src/cli/run'
import {_spawnProject} from './env'

const noop = () => undefined

describe('cli', () => {
  jest.setTimeout(20000)

  test('run `etl` command', async () => {
    // Spy on `console.log`
    const log = jest.spyOn(global.console, 'log').mockImplementation(noop)

    const project = await _spawnProject('mylib/1.0.0')

    await run({
      args: ['lib/esm/index.d.ts'],
      cwd: project.cwd,
      cmd: 'etl',
      flags: {
        outDir: 'etc',
        tsconfig: 'tsconfig.lib.json',
      },
    })

    project.remove()

    expect(log).toBeCalledWith(`${chalk.green('success')} wrote documents to etc/1.0.0.json`)

    // Reset the spy at the end of the test
    log.mockReset()
  })
})
