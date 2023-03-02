import {TSDocProvider} from '@sanity/tsdoc/react'
import {API_MEMBER_TYPES} from '@sanity/tsdoc/store'
import {Box, Flex} from '@sanity/ui'
import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {useCallback} from 'react'
import {useApp} from '../../app'
import {ARTICLE_LIST_QUERY} from '../../app/articleList'
import {ArticleListData} from '../../app/articleList'
import {defaultParams} from '../../app/constants'
import {Nav} from '../../app/Nav'
import {NavWrapperCard} from '../../app/NavWrapperCard'
import {PAGE_DATA_QUERY, PAGE_PATHS_QUERY, PageContent, PageData} from '../../app/page'
import {client} from '../../sanity/client'

interface PageProps {
  data: {
    articleList: ArticleListData
    page: PageData | null
  }
  slug: string | null
}

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const {params = {}} = ctx

  const articleListData = await client.fetch(ARTICLE_LIST_QUERY)

  const pageData = await client.fetch<PageData | null>(PAGE_DATA_QUERY, {
    ...params,
    memberTypes: API_MEMBER_TYPES,
  })

  return {
    props: {
      data: {
        articleList: articleListData,
        page: pageData,
      },
      slug: params?.['slug'] || null,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await client.fetch<{slug: string}[] | null>(PAGE_PATHS_QUERY)

  return {paths: data?.map((d) => `/learn/${d.slug}`) || [], fallback: false}
}

export default function Page(props: PageProps) {
  const {data} = props
  const {store} = useApp()
  const router = useRouter()

  const handlePathChange = useCallback(
    (nextPath: string, _replace?: boolean) => {
      if (_replace) {
        router.replace(`/reference/${nextPath.replace('./', 'index/')}`)
      } else {
        router.push(`/reference/${nextPath.replace('./', 'index/')}`)
      }
    },
    [router]
  )

  return (
    <TSDocProvider
      onPathChange={handlePathChange}
      params={defaultParams}
      path="/"
      store={store.tsdoc}
    >
      <Flex>
        <NavWrapperCard borderRight flex={1}>
          <Nav articleList={data.articleList} />
        </NavWrapperCard>

        <Box flex={3}>
          <PageContent data={data.page} />
        </Box>
      </Flex>
    </TSDocProvider>
  )
}
