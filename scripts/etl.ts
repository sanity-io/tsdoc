import {etlCommand} from '../src/cli/etl'

global.__DEV__ = true

etlCommand({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
