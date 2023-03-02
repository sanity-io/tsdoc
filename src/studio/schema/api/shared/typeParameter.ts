import {defineField, defineType} from 'sanity'

export const apiTypeParameterType = defineType({
  type: 'object',
  name: 'api.typeParameter',
  title: 'Type parameter',
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
    defineField({
      type: 'api.tokens',
      name: 'constraintType',
      title: 'Constraint type',
    }),
    defineField({
      type: 'api.tokens',
      name: 'defaultType',
      title: 'Default type',
    }),
    // defineField({
    //   type: 'api.releaseTag',
    //   name: 'releaseTag',
    //   title: 'Release tag',
    // }),
    // defineField({
    //   type: 'api.tokens',
    //   name: 'type',
    //   title: 'Type',
    // }),
  ],
})
