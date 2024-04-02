import path from 'path'

import {_fileExists} from '../_lib/_fileExists'

const CONFIG_FILE_NAMES = [
  'tsdoc.config.js',
  'tsdoc.config.jsx',
  'tsdoc.config.mjs',
  'tsdoc.config.cjs',
  'tsdoc.config.ts',
  'tsdoc.config.tsx',
]

/** @internal */
export function _findConfigFile(options: {packagePath: string}): string | undefined {
  const {packagePath} = options

  for (const f of CONFIG_FILE_NAMES) {
    const file = path.resolve(packagePath, f)

    if (_fileExists(file)) return file
  }

  return undefined
}
