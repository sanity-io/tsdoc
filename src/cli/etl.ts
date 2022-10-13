/* eslint-disable no-console */

import path from 'path'
import createSanityClient from '@sanity/client'
import {
  APIPackageDocument,
  SanityTSDocConfigOptions,
  _loadConfig,
  _printExtractMessages,
  extract,
  load,
  transform,
} from '@sanity/tsdoc'
import chalk from 'chalk'
import mkdirp from 'mkdirp'
import pkgUp from 'pkg-up'
import {readJSONFile} from './helpers'

async function _fetchPackageDocsFromSanity(
  sanity: NonNullable<SanityTSDocConfigOptions['sanity']>
) {
  const client = createSanityClient({
    ...sanity,
    apiVersion: '2022-10-01',
    useCdn: false,
  })

  return await client.fetch('*[_type == "api.package"]')
}

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

  let pkgDocs: APIPackageDocument[] = []

  if (config?.sanity) {
    pkgDocs = await _fetchPackageDocsFromSanity(config.sanity)
  }

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

  const currPackageDoc = pkgDocs.find((p) => {
    const n = [p.scope, p.name].filter(Boolean).join('/')

    return n == pkg.name
  })

  if (currPackageDoc) {
    delete currPackageDoc._createdAt
    delete currPackageDoc._updatedAt
  }

  // TODO: load api docs of dependencies

  const docs = transform(results, {
    currPackageDoc,
    package: {version: pkg.version},
  })

  await mkdirp(path.dirname(jsonPath))

  if (config?.sanity && !config.sanity.token) {
    console.warn(
      // prettier-ignore
      `${chalk.gray('ignore')} no token provided, skipped writing to sanity (${config.sanity.projectId}:${config.sanity.dataset})`
    )

    return
  }

  await load(docs, {
    cwd,
    fs: {path: jsonPath},
    sanity: config?.sanity,
  })

  console.log('')
  console.log(
    // prettier-ignore
    `${chalk.green('success')} wrote ${docs.length} documents to ${path.relative(cwd, jsonPath)}`
  )

  if (config?.sanity?.token) {
    console.log('')
    console.log(
      // prettier-ignore
      `${chalk.green('success')} wrote ${docs.length} documents to Sanity (${config.sanity.projectId}:${config.sanity.dataset})`
    )
  }
}
