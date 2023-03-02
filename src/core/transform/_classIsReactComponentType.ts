import {ApiClass} from '@microsoft/api-extractor-model'

export function _classIsReactComponentType(node: ApiClass): boolean {
  const extendsTypeTokens = node.extendsType?.excerpt.tokens

  const extendedName = extendsTypeTokens?.[1]?.text || ''

  if (
    extendedName.startsWith('React.Component') ||
    extendedName.startsWith('React_2.Component') ||
    extendedName.startsWith('Component') ||
    extendedName.startsWith('React.PureComponent') ||
    extendedName.startsWith('React_2.PureComponent') ||
    extendedName.startsWith('PureComponent')
  ) {
    return true
  }

  return false
}
