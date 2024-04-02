import {defineField, defineType} from 'sanity'

export const apiTokenType = defineType({
  type: 'object',
  name: 'api.token',
  title: 'Token',

  fields: [
    defineField({
      type: 'string',
      name: 'text',
      title: 'Text',
    }),
    defineField({
      type: 'reference',
      name: 'member',
      title: 'Member',
      // @ts-expect-error find out why this is not working
      to: [
        {type: 'api.class'},
        {type: 'api.enum'},
        {type: 'api.function'},
        {type: 'api.interface'},
        {type: 'api.typeAlias'},
        {type: 'api.variable'},
      ],
    }),
  ],
})
