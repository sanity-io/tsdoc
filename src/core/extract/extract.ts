import path from 'path'
import {Extractor, ExtractorConfig, ExtractorMessage} from '@microsoft/api-extractor'
import {ApiPackage} from '@microsoft/api-extractor-model'
import {PkgConfigOptions, _getExtractMessagesConfig} from '@sanity/pkg-utils'
import {createApiExtractorConfig} from './apiExtractorConfig'
import {createTempDir} from './helpers'
import {createTSDocConfig} from './tsDocConfig'
import {TSDocCustomTag} from './types'

/**
 * @public
 */
export interface ExtractResult {
  apiPackage?: ApiPackage
  exportPath?: string
  messages: ExtractorMessage[]
  succeeded: boolean
  tempDirPath: string
  typesPath: string
}

function _resolveExports(options: {pkg: any}) {
  const {pkg} = options

  const exports: {type: 'export'; path?: string; typesPath: string}[] = []
  const types = pkg.typesVersions?.['*']

  if (pkg.exports) {
    for (const [exportPath] of Object.entries(pkg.exports)) {
      const isRoot = exportPath === '.'
      const subPath = isRoot ? undefined : path.relative('root', path.join('root', exportPath))
      const typesPath = subPath ? types?.[subPath]?.[0] : pkg.types

      if (!typesPath) {
        throw new Error(`[${pkg.name}] missing types path`)
      }

      exports.push({
        type: 'export',
        path: subPath,
        typesPath,
      })
    }
  } else {
    const typesPath = pkg.types

    if (!typesPath) {
      throw new Error(`[${pkg.name}] missing types path`)
    }

    exports.push({
      type: 'export',
      path: undefined,
      typesPath,
    })
  }

  return exports
}

/**
 * Extract API information
 *
 * @template
 * Testing this.
 *
 * @public
 */
export async function extract(options: {
  customTags?: TSDocCustomTag[]
  packagePath: string
  rules?: NonNullable<PkgConfigOptions['extract']>['rules']
  tsconfig?: string
}): Promise<ExtractResult[]> {
  const {customTags, packagePath, rules, tsconfig: tsconfigPath} = options
  const tempDir = await createTempDir()
  const tempDirPath = tempDir.path
  const packageJsonFullPath = path.resolve(packagePath, 'package.json')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(packageJsonFullPath)

  if (!pkg.types) {
    throw new Error(`package is missing \`types\` property (name=${pkg.name})`)
  }

  const exports = _resolveExports({pkg})

  try {
    const results: ExtractResult[] = []

    for (const exp of exports) {
      const result = await _doExtract({
        customTags,
        rules,
        mainEntryPointFilePath: exp.typesPath,
        packagePath,
        tempDirPath,
        tsconfigPath,
        packageJsonFullPath,
      })

      results.push({
        exportPath: exp.path,
        tempDirPath,
        typesPath: exp.typesPath,
        ...result,
      })
    }

    // Clean up temporary directory
    tempDir.cleanup()

    return results
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
  tsconfigPath?: string
  packageJsonFullPath: string
}) {
  const {
    customTags,
    rules,
    mainEntryPointFilePath,
    packagePath,
    tempDirPath,
    tsconfigPath,
    packageJsonFullPath,
  } = options

  const tsdocConfigFile = await createTSDocConfig({customTags: customTags || []})

  // Load the API Extractor configuration
  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    configObject: createApiExtractorConfig({
      mainEntryPointFilePath,
      messagesConfig: _getExtractMessagesConfig({rules}),
      packagePath,
      tempDirPath,
      tsconfigPath,
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
    // tempDirPath,
  }
}
