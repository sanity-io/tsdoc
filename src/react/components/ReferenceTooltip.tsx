import {
  APIClass,
  APIFunction,
  APIInterface,
  APIMember,
  APIParameter,
  APIToken,
  APITypeAlias,
  APIVariable,
} from '@sanity/tsdoc'
import {Box, Code, Container, Tooltip} from '@sanity/ui'
import {ReactElement} from 'react'
import styled from 'styled-components'
import {CommentSummary} from './comment'

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

const CommentBox = styled(Box)`
  border-top: 1px solid var(--card-border-color);

  & > *:first-child {
    margin-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`

function ReferenceTooltipContent(props: {data: APIMember}) {
  const {data} = props

  if (data._type === 'api.class') {
    return (
      <>
        <Box padding={3} overflow="auto">
          <Code language="typescript" size={1}>
            {_compileClassDefinition(data)}
          </Code>
        </Box>

        {data.comment?.summary && (
          <CommentBox padding={3}>
            <Container width={1}>
              <CommentSummary data={data.comment} fontSize={0} />
            </Container>
          </CommentBox>
        )}
      </>
    )
  }

  if (data._type === 'api.function') {
    return (
      <>
        <Box padding={3} overflow="auto">
          <Code language="typescript" size={1}>
            {_compileFunctionDefinition(data)}
          </Code>
        </Box>

        {data.comment?.summary && (
          <CommentBox padding={3}>
            <Container width={1}>
              <CommentSummary data={data.comment} fontSize={0} />
            </Container>
          </CommentBox>
        )}
      </>
    )
  }

  if (data._type === 'api.interface') {
    return (
      <>
        <Box padding={3} overflow="auto">
          <Code language="typescript" size={1}>
            {_compileInterfaceDefinition(data)}
          </Code>
        </Box>

        {data.comment?.summary && (
          <CommentBox padding={3}>
            <Container width={1}>
              <CommentSummary data={data.comment} fontSize={0} />
            </Container>
          </CommentBox>
        )}
      </>
    )
  }

  if (data._type === 'api.typeAlias') {
    return (
      <>
        <Box padding={3} overflow="auto">
          <Code language="typescript" size={1}>
            {_compileTypeAliasDefinition(data)}
          </Code>
        </Box>

        {data.comment?.summary && (
          <CommentBox padding={3}>
            <Container width={1}>
              <CommentSummary data={data.comment} fontSize={0} />
            </Container>
          </CommentBox>
        )}
      </>
    )
  }

  if (data._type === 'api.variable') {
    return (
      <>
        <Box padding={3} overflow="auto">
          <Code language="typescript" size={1}>
            {_compileVariableDefinition(data)}
          </Code>
        </Box>

        {data.comment?.summary && (
          <CommentBox padding={3}>
            <Container width={1}>
              <CommentSummary data={data.comment} fontSize={0} />
            </Container>
          </CommentBox>
        )}
      </>
    )
  }

  return (
    <Box padding={3}>
      <Code size={1}>Unknown type: {data._type}</Code>
    </Box>
  )
}

function _compileClassDefinition(data: APIClass) {
  let code = `class ${data.name} `

  code += `{`

  for (const m of data.members) {
    code += `\n  // @todo: ${m._type}`
  }

  code += `\n}`

  return code
}

function _compileFunctionDefinition(data: APIFunction) {
  let code = `function ${data.name}`

  const parameters = data.parameters.map((p: APIParameter) => {
    return `${p.name}: ${p.type.map((t) => t.text).join('')}`
  })

  if (parameters.length) {
    code += `(\n  ${parameters.join(',\n  ')}\n): `
  } else {
    code += `(): `
  }

  code += data.returnType.map((t) => t.text).join('')

  return code
}

function _compileTokens(tokens: APIToken[]) {
  return tokens.map((t) => t.text).join('')
}

function _compileInterfaceDefinition(data: APIInterface) {
  let code = `interface ${data.name}`

  if (data.extends.length) {
    code += ` ${data.extends.map((e) => _compileTokens(e.type)).join('')}`
  }

  if (data.members.length) {
    code += ` {`

    for (const m of data.members) {
      if (m._type === 'api.propertySignature') {
        code += `\n  ${m.name}${m.isOptional ? '?' : ''}: ${_compileTokens(m.type)}`
      } else if (m._type === 'api.indexSignature') {
        code += `\n  [`

        code += m.parameters.map((p) => {
          return `${p.name}: ${_compileTokens(p.type)}`
        })

        code += `]: ${_compileTokens(m.returnType)}`

        // code += `\n  ${m.name}${m.isOptional ? '?' : ''}: ${m.type.map((t) => t.text).join('')}`
      } else {
        code += `\n  // @todo: _type=${m._type}`
      }
    }

    code += `\n}`
  } else {
    code += ` {}`
  }

  return code
}

function _compileTypeAliasDefinition(data: APITypeAlias) {
  let code = `type ${data.name} = `

  code += data.type?.map((t) => t.text).join('')

  return code
}

function _compileVariableDefinition(data: APIVariable) {
  let code = `const ${data.name}: `

  code += data.type.map((t) => t.text).join('')

  return code
}
