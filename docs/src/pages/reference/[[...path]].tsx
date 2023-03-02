import {TSDocDetail, TSDocProvider, parsePath} from '@sanity/tsdoc/react'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {Box, Flex} from '@sanity/ui'
import {GetServerSideProps} from 'next'
import {useRouter} from 'next/router'
import {useCallback, useMemo} from 'react'
import {isArray, isString} from 'sanity'
import {useApp} from '../../app'
import {ARTICLE_LIST_QUERY, ArticleListData} from '../../app/articleList'
import {Nav} from '../../app/Nav'
import {NavWrapperCard} from '../../app/NavWrapperCard'
import {client} from '../../sanity/client'

export interface ReferencePageProps {
  data: {articleList: ArticleListData}
  path: string
}

export const getServerSideProps: GetServerSideProps<ReferencePageProps> = async (ctx) => {
  const pathParam = ctx.params?.['path']

  const articleListData = await client.fetch(ARTICLE_LIST_QUERY)

  if (isArray(pathParam)) {
    return {props: {data: {articleList: articleListData}, path: `/${pathParam.join('/')}`}}
  }

  if (isString(pathParam)) {
    return {props: {data: {articleList: articleListData}, path: `/${pathParam}`}}
  }

  return {props: {data: {articleList: articleListData}, path: '/'}}
}

export default function ReferencePage(props: ReferencePageProps) {
  const {data, path} = props
  const {store} = useApp()
  const router = useRouter()

  const params: TSDocAppParams | undefined = useMemo(() => parsePath(path), [path])

  const handlePathChange = useCallback(
    (nextPath: string, _replace?: boolean) => {
      if (_replace) {
        router.replace(`/reference/${nextPath}`)
      } else {
        router.push(`/reference/${nextPath}`)
      }
    },
    [router]
  )

  return (
    <TSDocProvider onPathChange={handlePathChange} params={params} path={path} store={store.tsdoc}>
      <Flex>
        <NavWrapperCard borderRight flex={1}>
          <Nav articleList={data.articleList} />
        </NavWrapperCard>

        <Box flex={3}>
          <TSDocDetail />
        </Box>
      </Flex>
    </TSDocProvider>
  )
}
