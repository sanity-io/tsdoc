import {ApiFunction} from '@microsoft/api-extractor-model'

function _isUpperCase(char: string) {
  return char === char.toUpperCase()
}

export function _functionIsReactComponentType(node: ApiFunction): boolean {
  const firstChar = node.name.slice(0, 1)

  if (!_isUpperCase(firstChar) || firstChar === '_' || firstChar === '$') {
    return false
  }

  const returnTypeTokens = node.excerptTokens.slice(
    node.returnTypeExcerpt.tokenRange.startIndex,
    node.returnTypeExcerpt.tokenRange.endIndex
  )

  const returnTypeCode = returnTypeTokens
    .map((t) => t.text)
    .join('')
    .trim()

  const returnsReactElement =
    returnTypeCode === 'React.ReactElement' ||
    returnTypeCode === 'React_2.ReactElement' ||
    returnTypeCode === 'ReactElement'
  const returnsReactNode =
    returnTypeCode === 'React.ReactNode' || 'React_2.ReactNode' || returnTypeCode === 'ReactNode'

  const returnsReactPortal =
    returnTypeCode === 'React.ReactPortal' ||
    returnTypeCode === 'React_2.ReactPortal' ||
    returnTypeCode === 'ReactPortal' ||
    returnTypeCode.startsWith('React.ReactPortal |') ||
    returnTypeCode.startsWith('React_2.ReactPortal |') ||
    returnTypeCode.startsWith('ReactPortal |')

  if (returnsReactElement || returnsReactNode || returnsReactPortal) {
    return true
  }

  return false
}
