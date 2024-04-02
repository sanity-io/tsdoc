import {
  APIClass,
  APIEnum,
  APIInterface,
  APIMember,
  APINamespace,
  SanityArrayItem,
} from '@sanity/tsdoc'
import {APIMemberWithInheritance} from './_types'

export function _getMembers(data: APIMember): SanityArrayItem<APIMemberWithInheritance>[] {
  if (!('members' in data)) {
    return []
  }

  let mems: SanityArrayItem<
    | APIClass['members'][0]
    | APIEnum['members'][0]
    | APIInterface['members'][0]
    | APINamespace['members'][0]
  >[] = data.members

  if ('extends' in data) {
    for (const ext of data.extends) {
      for (const tok of ext.type) {
        const member = tok.member

        if (member && 'members' in member) {
          mems = mems.concat(
            member.members.map((mem) => {
              const m: SanityArrayItem<APIMemberWithInheritance> = {
                ...mem,
                inheritedFrom: {name: member.name, slug: member.name},
              }

              return m
            }),
          )
        }
      }
    }
  }

  mems.sort((a, b) => {
    const aName = 'name' in a ? a.name : ''
    const bName = 'name' in b ? b.name : ''

    if (aName < bName) return -1
    if (aName > bName) return 1

    return 0
  })

  return mems
}
