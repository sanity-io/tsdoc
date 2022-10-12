import {devCommand} from '../src/cli/dev'

devCommand({
  cwd: process.cwd(),
  dataPath: ['etc/**/*.json', 'playground/*/etc/**/*.json'],
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
