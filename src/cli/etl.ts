import path from 'path'
import {_printExtractMessages, extract, load, transform} from '@sanity/tsdoc'
import chalk from 'chalk'
import mkdirp from 'mkdirp'
import pkgUp from 'pkg-up'
import {_loadConfig} from '../core/config'
import {readJSONFile} from './helpers'

export async function etlCommand(options: {
  cwd: string
  outDir?: string
  tsconfig?: string
}): Promise<void> {
  const {cwd} = options
  const outDir = typeof options.outDir === 'string' ? options.outDir : './etc'
  const tsconfigPath = typeof options.tsconfig === 'string' ? options.tsconfig : 'tsconfig.json'
  const packageJsonPath = await pkgUp({cwd})

  if (!packageJsonPath) {
    throw new Error('package.json not found')
  }

  const pkg = await readJSONFile(packageJsonPath)

  if (!pkg.name) {
    throw new Error('package.json is missing name')
  }

  if (!pkg.version) {
    throw new Error('package.json is missing version')
  }

  const packagePath = path.dirname(packageJsonPath)
  const jsonPath = path.resolve(packagePath, outDir, `${pkg.name}/${pkg.version}.json`)

  const config = await _loadConfig({packagePath})

  const results = await extract({
    customTags: config?.extract?.customTags,
    packagePath,
    rules: config?.extract?.rules,
    tsconfig: config?.tsconfig ?? tsconfigPath,
  })

  for (const result of results) {
    // eslint-disable-next-line no-console
    console.log('')

    // eslint-disable-next-line no-console
    console.log(
      `${chalk.bgCyan(
        chalk.black(` ${path.join(pkg.name, result.exportPath || '')} `)
      )} extracted from ${chalk.cyan(path.relative('.', result.typesPath))}`
    )

    _printExtractMessages(cwd, result.messages)
  }

  const messages = results.flatMap((result) => result.messages)
  const errors = messages.filter((m) => m.logLevel === 'error')

  if (errors.length) {
    process.exit(1)
  }

  const docs = transform(results, {
    package: {version: pkg.version},
  })

  await mkdirp(path.dirname(jsonPath))

  await load(docs, {fs: {path: jsonPath}})

  // eslint-disable-next-line no-console
  console.log('')

  // eslint-disable-next-line no-console
  console.log(
    `${chalk.green('success')} wrote documents to ${path.relative(packagePath, jsonPath)}`
  )
}
