import {
  APIClass,
  APIFunction,
  APIInterface,
  APIParameter,
  APIToken,
  APITypeAlias,
  APIVariable,
} from '@sanity/tsdoc'

/** @internal */
export function _compileClassDefinition(data: APIClass): string {
  let code = `class ${data.name} `

  code += `{`

  for (const m of data.members) {
    code += `\n  // @todo: ${m._type}`
  }

  code += `\n}`

  return code
}

/** @internal */
export function _compileFunctionDefinition(data: APIFunction): string {
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

/** @internal */
export function _compileTokens(tokens: APIToken[]): string {
  return tokens.map((t) => t.text).join('')
}

/** @internal */
export function _compileInterfaceDefinition(data: APIInterface): string {
  let code = `interface ${data.name}`

  if (data.extends.length) {
    code += ` extends ${data.extends.map((e) => _compileTokens(e.type)).join('')}`
  }

  if (data.members.length) {
    code += ` {`

    for (const m of data.members) {
      if (m._type === 'api.propertySignature') {
        code += `\n  ${m.name}${m.isOptional ? '?' : ''}: ${_compileTokens(m.type)}`
      } else if (m._type === 'api.callSignature') {
        code += `\n  (${m.parameters
          .map((p) => `${p.name}: ${_compileTokens(p.type)}`)
          .join(', ')}) => ${_compileTokens(m.returnType)}`
      } else if (m._type === 'api.indexSignature') {
        code += `\n  [`

        code += m.parameters.map((p) => {
          return `${p.name}: ${_compileTokens(p.type)}`
        })

        code += `]: ${_compileTokens(m.returnType)}`
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

/** @internal */
export function _compileTypeAliasDefinition(data: APITypeAlias): string {
  let code = `type ${data.name} = `

  code += data.type?.map((t) => t.text).join('')

  return code
}

/** @internal */
export function _compileVariableDefinition(data: APIVariable): string {
  let code = `const ${data.name}: `

  code += data.type.map((t) => t.text).join('')

  return code
}
