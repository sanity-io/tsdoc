import {Extractor, ExtractorConfig, type ExtractorMessage} from '@microsoft/api-extractor'
import {ApiPackage} from '@microsoft/api-extractor-model'
import {
  createLogger,
  getExtractMessagesConfig,
  loadConfig,
  loadPkgWithReporting,
  type PackageJSON,
  parseExports,
  type PkgConfigOptions,
} from '@sanity/pkg-utils'
import path from 'path'

import {createApiExtractorConfig} from './apiExtractorConfig'
import {createTempDir} from './helpers'
import {createTSDocConfig} from './tsDocConfig'
import type {TSDocCustomTag} from './types'

/**
 * @public
 */
export interface ExtractResult {
  apiPackage?: ApiPackage
  exportPath: string
  messages: ExtractorMessage[]
  succeeded: boolean
  tempDirPath: string
  typesPath: string
}

/**
 * Extract API information
 *
 * @public
 */
export async function extract(options: {
  customTags?: TSDocCustomTag[]
  packagePath: string
  rules?: NonNullable<PkgConfigOptions['extract']>['rules']
  strict: boolean
  legacyExports: boolean
  tsconfig?: string
  bundledPackages?: string[]
}): Promise<{pkg: PackageJSON; results: ExtractResult[]}> {
  const {
    customTags,
    packagePath,
    rules,
    strict,
    legacyExports,
    tsconfig: tsconfigPath = 'tsconfig.json',
    bundledPackages = [],
  } = options
  const tempDir = await createTempDir()
  const tempDirPath = tempDir.path
  const packageJsonFullPath = path.resolve(packagePath, 'package.json')

  // pkg utils
  const config = await loadConfig({cwd: packagePath})
  const logger = createLogger()
  const pkg = await loadPkgWithReporting({cwd: packagePath, logger, strict, legacyExports})

  logger.info('Using tsconfig: ', path.resolve(packagePath, tsconfigPath))

  // const exports = _resolveExports({pkg})
  const exports = parseExports({
    pkg,
    strict,
    legacyExports,
  })

  try {
    const results: ExtractResult[] = []

    for (const exp of exports) {
      if (!exp.source || !exp.default) {
        continue
      }

      const typesPath = exp.default.replace(/\.[mc]?js$/, '.d.ts')
      const result = await _doExtract({
        customTags,
        rules: rules ?? config?.extract?.rules,
        mainEntryPointFilePath: typesPath,
        packagePath,
        tempDirPath,
        tsconfigPath,
        packageJsonFullPath,
        bundledPackages,
      })

      results.push({
        exportPath: exp._path,
        tempDirPath,
        typesPath: typesPath,
        ...result,
      })
    }

    // Clean up temporary directory
    tempDir.cleanup()

    return {pkg, results}
  } catch (err) {
    // Clean up temporary directory
    tempDir.cleanup()

    throw err
  }
}

async function _doExtract(options: {
  customTags: NonNullable<PkgConfigOptions['extract']>['customTags']
  rules: NonNullable<PkgConfigOptions['extract']>['rules']
  mainEntryPointFilePath: string
  packagePath: string
  tempDirPath: string
  tsconfigPath: string
  packageJsonFullPath: string
  bundledPackages: string[]
}) {
  const {
    customTags,
    rules,
    mainEntryPointFilePath,
    packagePath,
    tempDirPath,
    tsconfigPath,
    packageJsonFullPath,
    bundledPackages,
  } = options

  const tsdocConfigFile = await createTSDocConfig({customTags: customTags || []})

  // Load the API Extractor configuration
  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    configObject: createApiExtractorConfig({
      mainEntryPointFilePath,
      messagesConfig: getExtractMessagesConfig({rules}),
      packagePath,
      tempDirPath,
      tsconfigPath,
      bundledPackages,
    }),
    configObjectFullPath: undefined,
    packageJson: undefined,
    packageJsonFullPath,
    tsdocConfigFile,
  })

  const messages: ExtractorMessage[] = []

  // Invoke API Extractor
  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,
    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
    // handle messages
    messageCallback(message: ExtractorMessage) {
      messages.push(message)
      message.handled = true
    },
  })

  const apiPackage = ApiPackage.loadFromJsonFile(path.resolve(tempDirPath, 'api.json'))

  return {
    apiPackage,
    messages,
    succeeded: extractorResult.succeeded,
  }
}
