import {register} from 'esbuild-register/dist/node'
import {_findConfigFile} from './_findConfigFile'
import type {SanityTSDocConfigOptions} from './types'

type RegisterOptions = Exclude<Parameters<typeof register>[0], undefined>

/** @internal */
export async function _loadConfig(options: {
  packagePath: string
}): Promise<SanityTSDocConfigOptions | undefined> {
  const {packagePath} = options

  const configPath = _findConfigFile({packagePath})

  if (!configPath) {
    return undefined
  }

  const esbuildOptions = {
    jsx: 'automatic',
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    jsxImportSource: 'react',
    logLevel: 'silent',
  } satisfies RegisterOptions

  const {unregister} = globalThis.__DEV__ ? {unregister: () => undefined} : register(esbuildOptions)

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(configPath)

  // Unregister the require hook as we don't need it anymore
  unregister()

  return config?.default || config
}
