import {APIMember} from '@sanity/tsdoc'
import {Box, Card, Code, Container, Flex, Heading, Label, Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import styled from 'styled-components'
import {CommentModifierTags} from './comment/CommentModifierTags'
import {TYPE_NAME} from './constants'
import {ReferenceContent} from './content'

const ContentBox = styled(Box)`
  & :first-child {
    margin-top: 0;
  }

  & :last-child {
    margin-bottom: 0;
  }
`

export function ReferenceArticle(props: {data: APIMember | null}): ReactElement {
  // const ref = useAPIMember()
  const {data} = props

  if (!data) return <></>

  // const memberPath = data.export.name.filter(Boolean).join('/')

  const isType = ['api.interface', 'api.namespace', 'api.typeAlias'].includes(data._type)

  const typeTitle =
    'isReactComponentType' in data && data.isReactComponentType
      ? 'Component'
      : TYPE_NAME[data._type] || data._type

  const modifierTags = data.comment?.modifierTags?.slice(0) || []

  // eslint-disable-next-line
  const title = useMemo(() => {
    if ('isReactComponentType' in data && data.isReactComponentType) {
      return <code>{`<${data.name} />`}</code>
    }

    if (data._type === 'api.function') {
      return <code>{data.name}()</code>
    }

    return <code>{data.name}</code>
  }, [data])

  return (
    <Flex as="article">
      <Box flex={3}>
        <Box paddingX={[3, 4, 5, 6]} paddingY={[4, 5, 6, 7]}>
          <Box marginBottom={[4, 5, 6]}>
            <Container width={1}>
              <Stack>
                <Flex>
                  <Box flex={1}>
                    <Flex gap={2}>
                      {modifierTags.length > 0 && (
                        <CommentModifierTags modifierTags={modifierTags} />
                      )}

                      <Box paddingY={1}>
                        <Label muted size={1}>
                          {typeTitle}
                        </Label>
                      </Box>
                    </Flex>

                    <Box marginTop={4}>
                      <Heading size={[1, 1, 2]}>{title}</Heading>
                    </Box>

                    <Card
                      border
                      marginTop={5}
                      overflow="auto"
                      padding={4}
                      radius={2}
                      tone="inherit"
                    >
                      <Code language="typescript" size={1}>{`${
                        isType ? `import type` : `import`
                      } {${data.name}} from '${data.export?.name}'`}</Code>
                    </Card>
                  </Box>
                </Flex>

                <ContentBox marginTop={6}>
                  <ReferenceContent data={data} />
                </ContentBox>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
