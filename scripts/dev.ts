import {run} from '../src/cli/run'

run({
  args: [
    'etc/api/@sanity/tsdoc/0.4.1.json',
    // '../v3/packages/sanity/etc/3.0.0-dev-preview.15.json',
    // '../pkg-utils/etc/1.3.0.json',
  ],
  cmd: 'dev',
  cwd: process.cwd(),
  flags: {port: 8080},
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
