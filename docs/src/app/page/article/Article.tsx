import {Box, Container, Heading} from '@sanity/ui'
import {ArticleData} from '../types'
import {Body} from './body'

export function Article(props: {data: ArticleData}) {
  const {data} = props

  return (
    <Box as="article" paddingX={[4, 4, 4, 5]} paddingY={[5, 5, 5, 6]}>
      <Container width={2}>
        <Box marginBottom={[6, 6, 6, 7]}>
          <Heading as="h1" size={5}>
            {data.headline}
          </Heading>
        </Box>

        <Body data={data.body} />
      </Container>
    </Box>
  )
}
