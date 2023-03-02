export interface ArticleListItem {
  headline: string
  slug: {current: string}
}

export type ArticleListData = ArticleListItem[]
