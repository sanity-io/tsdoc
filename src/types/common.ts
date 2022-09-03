import {Sanity} from '../_lib/sanity'
import {APIMember} from './members'
import {TSDoc} from './tsdoc'

/** @public */
export type APIReleaseTag = 'internal' | 'alpha' | 'beta' | 'public'

/** @public */
export interface APIToken {
  _type: 'api.token'
  member?: APIMember & {_id: string}
  text: string
}

/** @public */
export interface APIParameter {
  _type: 'api.parameter'
  comment?: TSDoc.Comment
  name: string
  releaseTag?: APIReleaseTag
  type: Sanity.ArrayItem<APIToken>[]
}

/** @public */
export interface APITypeParameter {
  _type: 'api.typeParameter'
  constraintType?: Sanity.ArrayItem<APIToken>[]
  defaultType: Sanity.ArrayItem<APIToken>[]
  name: string
}
