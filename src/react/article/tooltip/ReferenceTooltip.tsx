import {APIMember} from '@sanity/tsdoc'
import {Box, Code, Tooltip} from '@sanity/ui'
import {ReactElement} from 'react'
import styled from 'styled-components'
import {_fontSize} from '../../helpers'
import {ClassTooltipContent} from './content/ClassTooltipContent'
import {EnumTooltipContent} from './content/EnumTooltipContent'
import {FunctionTooltipContent} from './content/FunctionTooltipContent'
import {InterfaceTooltipContent} from './content/InterfaceTooltipContent'
import {TypeAliasTooltipContent} from './content/TypeAliasTooltipContent'
import {VariableTooltipContent} from './content/VariableTooltipContent'

const StyledTooltipChild = styled.span`
  a,
  a:visited {
    code {
      border-bottom: 1px dashed;
    }
  }
`

export function ReferenceTooltip(props: {
  children?: React.ReactElement
  member: APIMember
}): ReactElement {
  const {children, member} = props

  return (
    <Tooltip content={<ReferenceTooltipContent data={member} />} placement="top" portal>
      <StyledTooltipChild>{children}</StyledTooltipChild>
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
      <Code size={_fontSize(fontSize, [0, 0, 1])}>Unknown type: {data._type}</Code>
    </Box>
  )
}
