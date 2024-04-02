import cac from 'cac'

import {version} from '../../package.json'

const cli = cac()
const cwd = process.cwd()

cli.command('dev').action(async () => {
  const {devCommand} = await import('./dev')

  await devCommand({cwd})
})

cli
  .command('etl')
  .option('--cwd [cwd]', 'Output directory')
  .option('--outDir [outDir]', 'Output directory')
  .option('--strict', 'Strict mode')
  .option('--tsconfig [tsconfig]', 'Path to tsconfig.json')
  .action(async (options) => {
    const {etlCommand} = await import('./etl')

    await etlCommand({
      ...options,
      cwd: options.cwd || cwd,
    })
  })

cli.help()
cli.version(version)
cli.parse()
