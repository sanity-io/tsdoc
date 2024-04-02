import {APIMember} from '@sanity/tsdoc'
import {Box, Text, Tooltip} from '@sanity/ui'
import {ReactElement} from 'react'

import {Level, Size, useTextSize} from '../lib/ui'
import {ClassTooltipContent} from './content/ClassTooltipContent'
import {EnumTooltipContent} from './content/EnumTooltipContent'
import {FunctionTooltipContent} from './content/FunctionTooltipContent'
import {InterfaceTooltipContent} from './content/InterfaceTooltipContent'
import {TypeAliasTooltipContent} from './content/TypeAliasTooltipContent'
import {VariableTooltipContent} from './content/VariableTooltipContent'

/** @alpha */
export function ReferenceTooltip(props: {
  children?: React.ReactElement
  member: APIMember
}): ReactElement {
  const {children, member} = props

  return (
    <Tooltip
      content={
        <Size delta={-1}>
          <Level>
            <ReferenceTooltipContent data={member} />
          </Level>
        </Size>
      }
      placement="top"
      portal
    >
      {children}
    </Tooltip>
  )
}

/** @alpha */
export function ReferenceTooltipContent(props: {data: APIMember}): ReactElement {
  const {data} = props
  const textSize = useTextSize([-1, 0, 1])

  if (data._type === 'api.class') {
    return <ClassTooltipContent data={data} />
  }

  if (data._type === 'api.enum') {
    return <EnumTooltipContent data={data} />
  }

  if (data._type === 'api.function') {
    return <FunctionTooltipContent data={data} />
  }

  if (data._type === 'api.interface') {
    return <InterfaceTooltipContent data={data} />
  }

  if (data._type === 'api.typeAlias') {
    return <TypeAliasTooltipContent data={data} />
  }

  if (data._type === 'api.variable') {
    return <VariableTooltipContent data={data} />
  }

  return (
    <Box padding={3}>
      <Text size={textSize}>
        Unknown type: <code>{data._type}</code>
      </Text>
    </Box>
  )
}
