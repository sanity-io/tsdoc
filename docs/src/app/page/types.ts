import {SanityDocument} from '@sanity/client'

export interface ArticleData
  extends Omit<SanityDocument<{body?: any[]; headline?: string}>, '_type'> {
  _type: 'article'
}

export type PageData = ArticleData
