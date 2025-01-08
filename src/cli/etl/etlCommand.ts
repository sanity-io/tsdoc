/* eslint-disable no-console */

import {createClient} from '@sanity/client'
import {
  _loadConfig,
  _printExtractMessages,
  APIPackageDocument,
  extract,
  load,
  SanityTSDocConfigOptions,
  transform,
} from '@sanity/tsdoc'
import chalk from 'chalk'
import mkdirp from 'mkdirp'
import path from 'path'
import pkgUp from 'pkg-up'

async function _fetchPackageDocsFromSanity(
  sanity: NonNullable<NonNullable<SanityTSDocConfigOptions['output']>['sanity']>,
) {
  const client = createClient({
    ...sanity,
    apiVersion: '2022-10-01',
    useCdn: false,
  })

  return await client.fetch('*[_type == "api.package"]')
}

/** @beta */
export async function etlCommand(options: {
  cwd: string
  outDir?: string
  tsconfig?: string
  strict?: boolean
}): Promise<void> {
  const {cwd, outDir = 'etc', tsconfig: tsconfigPath = 'tsconfig.json', strict = false} = options

  const packageJsonPath = await pkgUp({cwd})

  if (!packageJsonPath) {
    throw new Error('package.json not found')
  }

  const packagePath = path.dirname(packageJsonPath)

  const config = await _loadConfig({packagePath})

  let pkgDocs: APIPackageDocument[] = []

  if (config?.output?.sanity) {
    pkgDocs = await _fetchPackageDocsFromSanity(config.output.sanity)
  }

  const {pkg, results} = await extract({
    customTags: config?.extract?.customTags,
    packagePath,
    rules: config?.extract?.rules,
    strict,
    tsconfig: config?.input?.tsconfig ?? tsconfigPath,
    bundledPackages: config?.input?.bundledPackages,
  })

  const jsonPath = path.resolve(packagePath, outDir, `${pkg.name}/${pkg.version}.json`)

  for (const result of results) {
    // eslint-disable-next-line no-console
    console.log('')

    // eslint-disable-next-line no-console
    console.log(
      `${chalk.bgCyan(
        chalk.black(` ${path.join(pkg['name'], result.exportPath || '')} `),
      )} extracted from ${chalk.cyan(path.relative('.', result.typesPath))}`,
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

    return n == pkg['name']
  })

  if (currPackageDoc) {
    delete currPackageDoc._createdAt
    delete currPackageDoc._updatedAt
  }

  // TODO: load api docs of dependencies

  const docs = transform(results, {
    currPackageDoc,
    package: {version: pkg['version']},
  })

  await mkdirp(path.dirname(jsonPath))

  if (config?.output?.sanity && !config.output?.sanity.token) {
    console.warn(
      // prettier-ignore
      `${chalk.gray('ignore')} no token provided, skipped writing to sanity (${config.output.sanity.projectId}:${config.output.sanity.dataset})`,
    )
  }

  await load(docs, {
    cwd,
    fs: {path: jsonPath},
    sanity: config?.output?.sanity,
  })

  console.log('')
  console.log(
    // prettier-ignore
    `${chalk.green('success')} wrote ${docs.length} documents to ${path.relative(cwd, jsonPath)}`,
  )

  if (config?.output?.sanity?.token) {
    console.log('')
    console.log(
      // prettier-ignore
      `${chalk.green('success')} wrote ${docs.length} documents to Sanity (${config.output?.sanity.projectId}:${config.output?.sanity.dataset})`,
    )
  }
}
