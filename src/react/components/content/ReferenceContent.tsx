import {APIMember} from '@sanity/tsdoc'
import {Code} from '@sanity/ui'
import {ReactElement} from 'react'
// import {APIMember} from '../../../lib/api'
import {ClassContent} from './ClassContent'
import {FunctionContent} from './FunctionContent'
import {InterfaceContent} from './InterfaceContent'
import {NamespaceContent} from './NamespaceContent'
import {TypeAliasContent} from './TypeAliasContent'
import {VariableContent} from './VariableContent'

export function ReferenceContent(props: {data: APIMember}): ReactElement {
  const {data} = props

  if (data._type === 'api.class') {
    return <ClassContent member={data} />
  }

  if (data._type === 'api.enum') {
    return <>todo: api.enum</>
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

  return <Code>{JSON.stringify(data)}</Code>
}
