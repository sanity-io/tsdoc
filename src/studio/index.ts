import {API_MEMBER_TYPES} from '@sanity/tsdoc/store'
import {definePlugin} from 'sanity'

import {useDeletePackageAction} from './documentActions/useDeletePackageAction'
import {apiTypes} from './schema/api'
import {tsdocTypes} from './schema/tsdoc'

/** @beta */
export const tsdoc = definePlugin(() => {
  return {
    name: '@sanity/tsdoc/studio-plugin',
    document: {
      actions: (prev, ctx) => {
        if (ctx.schemaType === 'api.package') {
          return [useDeletePackageAction]
        }

        if (ctx.schemaType === 'api.release') {
          return [] // TODO
        }

        if (ctx.schemaType === 'api.export') {
          return [] // TODO
        }

        if (ctx.schemaType === 'api.symbol') {
          return [] // TODO
        }

        if (API_MEMBER_TYPES.includes(ctx.schemaType)) {
          return [] // TODO
        }

        return prev
      },
    },
    schema: {
      types: [...apiTypes, ...tsdocTypes],
    },
  }
})
