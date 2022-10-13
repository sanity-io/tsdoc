import {APIMember} from '@sanity/tsdoc'
import {Box, Text, Tooltip} from '@sanity/ui'
import {ReactElement} from 'react'
import {_fontSize} from '../../helpers'
import {ClassTooltipContent} from './content/ClassTooltipContent'
import {EnumTooltipContent} from './content/EnumTooltipContent'
import {FunctionTooltipContent} from './content/FunctionTooltipContent'
import {InterfaceTooltipContent} from './content/InterfaceTooltipContent'
import {TypeAliasTooltipContent} from './content/TypeAliasTooltipContent'
import {VariableTooltipContent} from './content/VariableTooltipContent'

export function ReferenceTooltip(props: {
  children?: React.ReactElement
  fontSize?: number
  member: APIMember
}): ReactElement {
  const {children, fontSize, member} = props

  return (
    <Tooltip
      content={<ReferenceTooltipContent data={member} fontSize={fontSize} />}
      placement="top"
      portal
    >
      {children}
    </Tooltip>
  )
}

export function ReferenceTooltipContent(props: {data: APIMember; fontSize?: number}): ReactElement {
  const {data, fontSize = 2} = props

  if (data._type === 'api.class') {
    return <ClassTooltipContent data={data} fontSize={fontSize} />
  }

  if (data._type === 'api.enum') {
    return <EnumTooltipContent data={data} fontSize={fontSize} />
  }

  if (data._type === 'api.function') {
    return <FunctionTooltipContent data={data} fontSize={fontSize} />
  }

  if (data._type === 'api.interface') {
    return <InterfaceTooltipContent data={data} fontSize={fontSize} />
  }

  if (data._type === 'api.typeAlias') {
    return <TypeAliasTooltipContent data={data} fontSize={fontSize} />
  }

  if (data._type === 'api.variable') {
    return <VariableTooltipContent data={data} fontSize={fontSize} />
  }

  return (
    <Box padding={3}>
      <Text size={_fontSize(fontSize, [1, 1, 2])}>
        Unknown type: <code>{data._type}</code>
      </Text>
    </Box>
  )
}
