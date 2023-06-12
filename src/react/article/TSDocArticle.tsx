import {APIMember} from '@sanity/tsdoc'
import {Box, Card, Code, Container, Flex, Text, ThemeColorSyntax} from '@sanity/ui'
import {ReactElement} from 'react'
import {TSDocMemberTitle} from '../app'
import {CommentDeprecatedCallout, CommentSummary} from '../comment'
import {SyntaxText} from '../components/ColoredCode'
import {ReleaseBadge} from '../components/ReleaseBadge'
import {H, Level, Size, useSpace, useTextSize} from '../lib/ui'
import {ReferenceContent} from './content'

const TYPE_NAME: Record<APIMember['_type'], string> = {
  'api.class': 'class',
  'api.enum': 'enum',
  'api.function': 'function',
  'api.interface': 'interface',
  'api.namespace': 'namespace',
  'api.typeAlias': 'type',
  'api.variable': 'variable',
}

const TYPE_NAME_SYNTAX: Record<string, keyof ThemeColorSyntax | undefined> = {
  class: 'keyword',
  component: 'keyword',
  enum: 'keyword',
  function: 'keyword',
  hook: 'keyword',
  interface: 'keyword',
  namespace: 'keyword',
  type: 'keyword',
  variable: undefined,
}

function _getTypeName(data: APIMember) {
  if ('isReactComponentType' in data && data.isReactComponentType) {
    return 'component'
  }

  if ('isReactHook' in data && data.isReactHook) {
    return 'hook'
  }

  return TYPE_NAME[data._type]
}

/** @beta */
export function TSDocArticle(props: {data: APIMember & {versions: string[]}}): ReactElement {
  const {data} = props
  const isType = ['api.interface', 'api.namespace', 'api.typeAlias'].includes(data._type)
  const typeName = _getTypeName(data)

  return (
    <Box as="article" data-ui="TSDocArticle" paddingX={useSpace(3)} paddingY={useSpace(4)}>
      <Container width={2}>
        <Flex gap={1}>
          <Box flex="none">
            <ReleaseBadge releaseTag={data.releaseTag} />
          </Box>

          <Box flex="none" padding={1}>
            <Text size={useTextSize([-1, -1, 0])}>
              <SyntaxText $syntax={TYPE_NAME_SYNTAX[typeName]}>{typeName}</SyntaxText>
            </Text>
          </Box>
        </Flex>

        <H size={[-1, 0, 1, 2]}>
          <TSDocMemberTitle data={data} />
        </H>

        <Level>
          {data.comment?.deprecated && <CommentDeprecatedCallout data={data.comment} />}

          <Size delta={1}>{data.comment && <CommentSummary data={data.comment} />}</Size>

          <Box marginTop={useSpace([3, 3, 4])}>
            <H size={[-1, 0, 1, 2]}>Import</H>

            <Card border overflow="auto" padding={3} radius={3} tone="inherit">
              <Code language="typescript" size={useTextSize([-1, -1, 0])}>{`import {${
                isType ? `type ` : ``
              }${data.name}} from '${data.export?.name}'`}</Code>
            </Card>
          </Box>

          <ReferenceContent data={data} />
        </Level>
      </Container>
    </Box>
  )
}
