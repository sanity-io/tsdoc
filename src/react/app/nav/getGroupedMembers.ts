import {
  APIClass,
  APIEnum,
  APIFunction,
  APIInterface,
  APIMember,
  APINamespace,
  APITypeAlias,
  APIVariable,
} from '@sanity/tsdoc'
import {TSDocNavGroupedMembers} from './TSDocNav'

export function getGroupedMembers(members: APIMember[]): TSDocNavGroupedMembers {
  const components = members.filter(
    (mem) =>
      (mem._type === 'api.class' || mem._type === 'api.function' || mem._type === 'api.variable') &&
      mem.isReactComponentType
  ) as (APIClass | APIFunction | APIVariable)[]
  const hooks = members.filter(
    (mem) => mem._type === 'api.function' && mem.isReactHook
  ) as APIFunction[]
  const classes = members.filter(
    (mem) => !components.includes(mem as any) && mem._type === 'api.class'
  ) as APIClass[]
  const enums = members.filter((mem) => mem._type === 'api.enum') as APIEnum[]
  const functions = members.filter(
    (mem) =>
      !components.includes(mem as any) &&
      !hooks.includes(mem as any) &&
      mem._type === 'api.function'
  ) as APIFunction[]
  const interfaces = members.filter((mem) => mem._type === 'api.interface') as APIInterface[]
  const namespaces = members.filter((mem) => mem._type === 'api.namespace') as APINamespace[]
  const typeAliases = members.filter((mem) => mem._type === 'api.typeAlias') as APITypeAlias[]
  const variables = members.filter(
    (mem) => !components.includes(mem as any) && mem._type === 'api.variable'
  ) as APIVariable[]

  return {
    classes,
    enums,
    functions,
    interfaces,
    namespaces,
    reactComponents: components,
    reactHooks: hooks,
    typeAliases,
    variables,
  }
}
