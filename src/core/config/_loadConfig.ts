import {TransformOptions} from 'esbuild'
import {_findConfigFile} from './_findConfigFile'
import {SanityTSDocConfigOptions} from './types'

/** @internal */
export async function _loadConfig(options: {
  packagePath: string
}): Promise<SanityTSDocConfigOptions | undefined> {
  const {packagePath} = options

  const configPath = _findConfigFile({packagePath})

  if (!configPath) {
    return undefined
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {register} = require('esbuild-register/dist/node')

  const eslintOptions: TransformOptions = {
    // eslint options
    jsx: 'automatic',
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    jsxImportSource: 'react',
    logLevel: 'silent',
  }

  const {unregister} = register(eslintOptions)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath)

  // Unregister the require hook if you don't need it anymore
  unregister()

  return config?.default || config
}
