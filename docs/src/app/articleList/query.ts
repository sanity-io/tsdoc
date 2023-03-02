import groq from 'groq'

export const ARTICLE_LIST_QUERY = groq`
  *[_type == "article" && defined(slug.current)]{headline, slug}
`
