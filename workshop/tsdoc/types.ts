import {TSDocAppParams} from '@sanity/tsdoc/store'

export interface TSDocUpdateParamsMsg {
  type: 'workshop/tsdoc/updateParams'
  params: Partial<TSDocAppParams>
}

export type TSDocMsg = TSDocUpdateParamsMsg
