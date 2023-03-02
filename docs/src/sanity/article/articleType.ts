import {ApiIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const articleType = defineType({
  type: 'document',
  name: 'article',
  title: 'Article',
  fields: [
    defineField({
      type: 'string',
      name: 'headline',
      title: 'Headline',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {source: 'headline'},
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body',
      of: [
        defineArrayMember({
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              }),

              defineField({
                type: 'reference',
                name: 'apiSymbol',
                title: 'API symbol',
                icon: ApiIcon,
                to: [{type: 'api.symbol'}],
                options: {modal: {type: 'popover', width: 2}} as any,
              }),

              defineField({
                type: 'object',
                name: 'test',
                title: 'Test',
                fields: [
                  defineField({
                    type: 'string',
                    name: 'test',
                    title: 'Test',
                  }),
                ],
                options: {modal: {type: 'popover', width: 2}},
              }),
            ],
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
          ],
          of: [
            defineArrayMember({
              type: 'reference',
              name: 'apiSymbol',
              title: 'API symbol',
              to: [{type: 'api.symbol'}],
              options: {modal: {width: 2}} as any,
            }),
          ],
        }),
        defineArrayMember({
          type: 'code',
        }),
      ],
    }),
  ],
})
