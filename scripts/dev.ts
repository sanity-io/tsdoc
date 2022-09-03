import {devCommand} from '../src/cli/dev'

devCommand({
  cwd: process.cwd(),
  dataPath: [
    //
    'etc/**/*.json',
    '../pkg-utils/etc/**/*.json',
    '../v3/etc/api/sanity/**/*.json',
  ],
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
