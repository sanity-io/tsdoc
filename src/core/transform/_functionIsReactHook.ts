import {ApiFunction} from '@microsoft/api-extractor-model'

const hookRegex = /^use[A-Z0-9].*$/

export function _functionIsReactHook(node: ApiFunction): boolean {
  return hookRegex.test(node.name)
}
