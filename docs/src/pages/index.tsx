import {TSDocProvider} from '@sanity/tsdoc/react'
import {Box, Flex, Text} from '@sanity/ui'
import {GetStaticProps} from 'next'
import {useRouter} from 'next/router'
import {useCallback} from 'react'
import {useApp} from '../app'
import {ArticleListData} from '../app/articleList'
import {ARTICLE_LIST_QUERY} from '../app/articleList/query'
import {defaultParams} from '../app/constants'
import {Nav} from '../app/Nav'
import {NavWrapperCard} from '../app/NavWrapperCard'
import {client} from '../sanity/client'

export const getStaticProps: GetStaticProps = async () => {
  const articleListData = await client.fetch(ARTICLE_LIST_QUERY)

  return {
    props: {
      data: {articleList: articleListData},
    },
  }
}

export default function HomePage(props: {data: {articleList: ArticleListData}}) {
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
          <Box padding={4}>
            <Text>TODO</Text>
          </Box>
        </Box>
      </Flex>
    </TSDocProvider>
  )
}
