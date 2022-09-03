import pkg from '../package.json'
import {run} from '../src/cli/run'

run({
  args: [],
  cmd: 'etl',
  cwd: process.cwd(),
  flags: {outDir: `etc/api/${pkg.name}`, tsconfig: 'tsconfig.dist.json'},
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
