import {APIClass, APIEnum, APIInterface, APINamespace} from '@sanity/tsdoc'

export type APIMemberWithInheritance<
  M =
    | APIClass['members'][0]
    | APIEnum['members'][0]
    | APIInterface['members'][0]
    | APINamespace['members'][0]
> = M & {
  inheritedFrom?: {name: string; slug: string}
}
