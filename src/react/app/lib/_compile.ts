import {
  APIClass,
  APIFunction,
  APIInterface,
  APIParameter,
  APIToken,
  APITypeAlias,
  APITypeParameter,
  APIVariable,
} from '@sanity/tsdoc'

/** @internal */
export function _compileTypeParameters(typeParameters?: APITypeParameter[]): string {
  if (!typeParameters || typeParameters.length === 0) return ''

  return `<${typeParameters
    .map((p) => {
      let code = `${p.name}`

      if (p.constraintType?.length) {
        code += ` extends ${p.constraintType.map((t) => t.text).join('')}`
      }

      if (p.defaultType?.length) {
        code += ` = ${p.defaultType.map((t) => t.text).join('')}`
      }

      return code
    })
    .join(', ')}>`
}

/** @internal */
export function _compileClassDefinition(data: APIClass): string {
  let code = `class ${data.name}${_compileTypeParameters(data.typeParameters)} `

  code += `{`

  for (const m of data.members) {
    if (m._type === 'api.constructor') {
      code += `\n  constructor()`
    } else if (m._type === 'api.property') {
      code += `\n  ${m.name}${m.isOptional ? '?' : ''}: ${m.type.map((t) => t.text).join('')}`
    } else if (m._type === 'api.method') {
      code += `\n  ${m.name}${m.isOptional ? '?' : ''}(): ${m.returnType
        .map((t) => t.text)
        .join('')}`
    } else {
      // code += `\n  // @todo: ${m._type}`
    }
  }

  code += `\n}`

  return code
}

/** @internal */
export function _compileFunctionDefinition(data: APIFunction): string {
  let code = `function ${data.name}${_compileTypeParameters(data.typeParameters)}`

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
  let code = `interface ${data.name}${_compileTypeParameters(data.typeParameters)}`

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
  let code = `type ${data.name}${_compileTypeParameters(data.typeParameters)} = `

  code += data.type?.map((t) => t.text).join('')

  return code
}

/** @internal */
export function _compileVariableDefinition(data: APIVariable): string {
  let code = `const ${data.name}: `

  code += data.type.map((t) => t.text).join('')

  return code
}
