import {SanitySlugValue} from '../_lib/sanity'
import {APIPackage} from './package'

/** @public */
export interface APISymbol {
  _type: 'api.symbol'
  name: string
  package: APIPackage
  slug: SanitySlugValue
}
