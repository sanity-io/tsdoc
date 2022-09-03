import {etlCommand} from '../src/cli/etl'

etlCommand({cwd: process.cwd()}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
