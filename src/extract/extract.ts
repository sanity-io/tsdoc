import path from 'path'
import {
  Extractor,
  ExtractorConfig,
  ExtractorMessage,
  IExtractorMessagesConfig,
} from '@microsoft/api-extractor'
import {ApiPackage} from '@microsoft/api-extractor-model'
import {TSDocConfigFile} from '@microsoft/tsdoc-config'
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
 * @public
 */
export async function extract(
  packagePath: string,
  options: {
    customTags?: TSDocCustomTag[]
    reporting?: IExtractorMessagesConfig
    tsconfigPath?: string
  } = {}
): Promise<ExtractResult[]> {
  const {customTags = [], reporting, tsconfigPath} = options

  // console.log('extract', tsconfigPath)

  const tempDir = await createTempDir()
  const tempDirPath = tempDir.path
  const tsdocConfigFile = await createTSDocConfig({customTags})
  const packageJsonFullPath = path.resolve(packagePath, 'package.json')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(packageJsonFullPath)

  if (!pkg.types) {
    throw new Error(`package is missing \`types\` property (name=${pkg.name})`)
  }

  // console.log('extract', tsconfigPath)

  const exports = _resolveExports({pkg})

  try {
    const results: ExtractResult[] = []

    for (const exp of exports) {
      results.push({
        exportPath: exp.path,
        ...(await _doExtract({
          typesPath: exp.typesPath,
          reporting,
          packagePath,
          tempDirPath,
          tsconfigPath,
          tsdocConfigFile,
          packageJsonFullPath,
        })),
      })
    }

    // Clean up temporary directory
    tempDir.cleanup()

    // console.log('results', results)

    return results
  } catch (err) {
    // Clean up temporary directory
    tempDir.cleanup()

    throw err
  }
}

async function _doExtract(options: {
  typesPath: string
  packagePath: string
  reporting?: IExtractorMessagesConfig
  tempDirPath: string
  tsconfigPath?: string
  tsdocConfigFile?: TSDocConfigFile
  packageJsonFullPath: string
}) {
  const {
    typesPath,
    packagePath,
    reporting,
    tempDirPath,
    tsconfigPath,
    tsdocConfigFile,
    packageJsonFullPath,
  } = options

  // Load the API Extractor configuration
  const extractorConfig: ExtractorConfig = ExtractorConfig.prepare({
    configObject: createApiExtractorConfig({
      mainEntryPointFilePath: typesPath,
      packagePath,
      reporting,
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

  // if (!extractorResult.succeeded) {
  //   console.log(messages, extractorResult.errorCount)

  //   throw new Error('could not extract')
  // }

  return {apiPackage, messages, succeeded: extractorResult.succeeded, tempDirPath}
}
