import {API_MEMBER_PROJECTION} from '@sanity/tsdoc/store'
import groq from 'groq'

export const PAGE_DATA_QUERY = groq`*[slug.current == $slug][0]{
  _type == 'article' => {
    ...,
    body[]{
      ...,

      // expand marks
      markDefs[]{
        _type == 'apiSymbol' => @->{
          "_key": ^._key,
          "_type": "apiSymbol",
          "data": *[_type in $memberTypes && package._ref == ^.package._ref && name == ^.name]{
            ${API_MEMBER_PROJECTION}
          }[0]
        },
        _type != 'apiSymbol' => @
      }
    }
  }
}`

export const PAGE_PATHS_QUERY = groq`*[defined(slug.current)]{'slug': slug.current}`
