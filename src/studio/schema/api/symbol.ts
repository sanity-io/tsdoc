import {defineField, defineType} from 'sanity'

export const apiSymbolType = defineType({
  type: 'document',
  name: 'api.symbol',
  title: 'Symbol',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
    defineField({
      type: 'reference',
      name: 'package',
      title: 'Package',
      to: [{type: 'api.package'}],
      // hidden: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      packageScope: 'package.scope',
      packageName: 'package.name',
    },
    prepare(data: any) {
      return {
        title: data.name,
        subtitle: [data.packageScope, data.packageName].filter(Boolean).join('/'),
      }
    },
  },
  readOnly: true,
})
