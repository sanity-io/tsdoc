import {ApiFunction} from '@microsoft/api-extractor-model'

export function _functionIsReactHook(node: ApiFunction): boolean {
  return node.name.startsWith('use')
}
