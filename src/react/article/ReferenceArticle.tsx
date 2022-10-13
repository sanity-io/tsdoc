import {APIMember} from '@sanity/tsdoc'
import {Box, Card, Code, Container, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {TSDocMemberTitle} from '../app'
import {CommentSummary} from '../comment'
import {SyntaxText} from '../components/ColoredCode'
import {ReleaseTag} from '../components/ReleaseTag'
import {UnformattedCode} from '../components/UnformattedCode'
import {_fontSize, _space} from '../helpers'
import {H} from '../typography'
import {ReferenceContent} from './content'

export function ReferenceArticle(props: {
  data: APIMember
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props

  const isType = ['api.interface', 'api.namespace', 'api.typeAlias'].includes(data._type)

  return (
    <Box
      as="article"
      data-ui="ReferenceArticle"
      paddingX={_space(fontSize, [4, 4, 4, 5])}
      paddingY={_space(fontSize, [5, 5, 5, 4])}
    >
      <Container width={1}>
        <Text as="p" size={_fontSize(fontSize, [0, 0, 1])}>
          <UnformattedCode>{data.export.name} </UnformattedCode>
          <SyntaxText $syntax="comment">v{data.release.version} </SyntaxText>
          {data.releaseTag !== 'public' && (
            <ReleaseTag $tag={`@${data.releaseTag || 'public'}`}>{`@${
              data.releaseTag || 'public'
            }`}</ReleaseTag>
          )}
        </Text>

        <H fontSize={fontSize} level={1} marginTop={_space(fontSize, [3, 3, 3])}>
          <TSDocMemberTitle data={data} />
        </H>

        {data.comment && <CommentSummary data={data.comment} fontSize={fontSize + 1} />}

        <Box marginTop={_space(fontSize, [3, 3, 4])}>
          <H fontSize={fontSize} level={2}>
            Import
          </H>

          <Card border overflow="auto" padding={3} radius={2} tone="inherit">
            <Code language="typescript" size={_fontSize(fontSize, [0, 0, 1])}>{`import {${
              isType ? `type ` : ``
            }${data.name}} from '${data.export?.name}'`}</Code>
          </Card>
        </Box>

        <ReferenceContent data={data} fontSize={fontSize} level={level + 1} />
      </Container>
    </Box>
  )
}
