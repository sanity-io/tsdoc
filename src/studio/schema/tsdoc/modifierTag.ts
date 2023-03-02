import {defineType} from 'sanity'

export const tsdocModifierTagType = defineType({
  type: 'object',
  name: 'tsdoc.modifierTag',
  title: 'Modifier tag',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
  ],
})
