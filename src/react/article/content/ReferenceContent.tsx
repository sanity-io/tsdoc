import {APIMember} from '@sanity/tsdoc'
import {Code} from '@sanity/ui'
import {ReactElement} from 'react'
import {_fontSize} from '../../helpers'
import {ClassContent} from './ClassContent'
import {FunctionContent} from './FunctionContent'
import {InterfaceContent} from './InterfaceContent'
import {NamespaceContent} from './NamespaceContent'
import {TypeAliasContent} from './TypeAliasContent'
import {VariableContent} from './VariableContent'

export function ReferenceContent(props: {
  data: APIMember
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props

  if (data._type === 'api.class') {
    return <ClassContent data={data} fontSize={fontSize} />
  }

  if (data._type === 'api.function') {
    return <FunctionContent data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.interface') {
    return <InterfaceContent data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.namespace') {
    return <NamespaceContent data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.typeAlias') {
    return <TypeAliasContent data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.variable') {
    return <VariableContent data={data} fontSize={fontSize} level={level} />
  }

  return (
    <Code language="json" size={_fontSize(fontSize, [0, 0, 1])}>
      {JSON.stringify(data, null, 2)}
    </Code>
  )
}
