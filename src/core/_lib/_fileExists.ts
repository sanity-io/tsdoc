import {accessSync} from 'fs'

export function _fileExists(file: string): boolean {
  try {
    accessSync(file)

    return true
  } catch (_) {
    return false
  }
}
