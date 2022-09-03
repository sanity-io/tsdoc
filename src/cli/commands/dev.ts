import {devRuntime} from '../../runtime/dev'
import {CmdFn} from '../types'

export const dev: CmdFn = async ({args, cwd, flags}) => {
  const dataPath = String(args[0])

  if (!dataPath) {
    throw new Error('missing path argument')
  }

  await devRuntime({cwd, dataPath, port: flags.port as number})
}
