import {APIMember} from '@sanity/tsdoc'
import {Code} from '@sanity/ui'

import {useTextSize} from '../../lib/ui'
import {ClassContent} from './ClassContent'
import {FunctionContent} from './FunctionContent'
import {InterfaceContent} from './InterfaceContent'
import {NamespaceContent} from './NamespaceContent'
import {TypeAliasContent} from './TypeAliasContent'
import {VariableContent} from './VariableContent'

export function ReferenceContent(props: {data: APIMember}): React.ReactNode {
  const {data} = props
  const textSize = useTextSize([1, 1, 2])

  if (data._type === 'api.class') {
    return <ClassContent data={data} />
  }

  if (data._type === 'api.function') {
    return <FunctionContent data={data} />
  }

  if (data._type === 'api.interface') {
    return <InterfaceContent data={data} />
  }

  if (data._type === 'api.namespace') {
    return <NamespaceContent data={data} />
  }

  if (data._type === 'api.typeAlias') {
    return <TypeAliasContent data={data} />
  }

  if (data._type === 'api.variable') {
    return <VariableContent data={data} />
  }

  return (
    <Code language="json" size={textSize}>
      {JSON.stringify(data, null, 2)}
    </Code>
  )
}
