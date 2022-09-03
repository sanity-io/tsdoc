import {
  APICallSignature,
  APIConstructor,
  APIMember,
  APIMethod,
  APIMethodSignature,
  APIProperty,
  APIPropertySignature,
} from '@sanity/tsdoc'
import {Box, Card, Code, Flex, Label, Stack, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {CommentSummary} from '../../comment'
import {ReleaseTag} from '../../components/ReleaseTag'
import {UnformattedCode} from '../../components/UnformattedCode'
import {_fontSize, _space} from '../../helpers'
import {ClassContent} from '../content/ClassContent'
import {InterfaceContent} from '../content/InterfaceContent'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'

export function Members(props: {
  data: APIMemberWithInheritance[]
  fontSize?: number
  level?: number
  member: APIMember
}): ReactElement {
  const {data, fontSize = 2, level, member} = props

  return (
    <Stack space={_space(fontSize, [2, 2, 2])}>
      {data.map(
        (m) =>
          m && <Member data={m} fontSize={fontSize} key={m._key} level={level} member={member} />
      )}
    </Stack>
  )
}

function Member(props: {
  data: APIMemberWithInheritance
  fontSize?: number
  level?: number
  member: APIMember
}) {
  const {data, fontSize = 2, level, member} = props

  if (data._type === 'api.constructor') {
    return <ApiContructorMember data={data} fontSize={fontSize} level={level} member={member} />
  }

  if (data._type === 'api.method') {
    return <ApiMethodMember data={data} fontSize={fontSize} level={level} member={member} />
  }

  if (data._type === 'api.property') {
    return <ApiPropertyMember data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.propertySignature') {
    return <ApiPropertySignature data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.callSignature') {
    return <ApiCallSignatureMember data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.methodSignature') {
    return (
      <ApiMethodSignatureMember data={data} fontSize={fontSize} member={member} level={level} />
    )
  }

  if (data._type === 'api.constructSignature') {
    return (
      <Card padding={3} tone="critical">
        <Text size={_fontSize(fontSize, [1, 1, 2])}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.indexSignature') {
    return (
      <Card padding={3} tone="critical">
        <Text size={_fontSize(fontSize, [1, 1, 2])}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.class') {
    return <ClassContent data={data} />
  }

  if (data._type === 'api.enum') {
    return (
      <Card padding={3} tone="critical">
        <Text size={_fontSize(fontSize, [1, 1, 2])}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.enumMember') {
    return (
      <Card padding={3} tone="critical">
        <Text size={fontSize}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.function') {
    return (
      <Card padding={3} tone="critical">
        <Text size={fontSize}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.interface') {
    return <InterfaceContent data={data} fontSize={fontSize} level={level} />
  }

  if (data._type === 'api.namespace') {
    return (
      <Card padding={3} tone="critical">
        <Text size={fontSize}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.typeAlias') {
    return (
      <Card padding={3} tone="critical">
        <Text size={fontSize}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.variable') {
    return (
      <Card padding={3} tone="critical">
        <Text size={fontSize}>TODO</Text>
      </Card>
    )
  }

  return (
    <Card padding={3} tone="critical">
      <Text size={fontSize}>
        Unexpected member type: <code>{(data as any)._type}</code>
      </Text>
    </Card>
  )
}

function MemberInheritedFrom(props: {data: {name: string; slug?: string}; fontSize?: number}) {
  const {data, fontSize = 2} = props

  return (
    <Text as="p" muted size={_fontSize(fontSize, [1, 1, 2])}>
      Inherited from{' '}
      {data.slug && (
        <code>
          <a>{data.name}</a>
        </code>
      )}
      {!data.slug && <code>{data.name}</code>}.
    </Text>
  )
}

function ApiCallSignatureMember(props: {
  data: APIMemberWithInheritance<APICallSignature>
  fontSize?: number
  level?: number
}) {
  const {data, fontSize = 2, level = 1} = props
  const {comment} = data

  return (
    <Card overflow="hidden" radius={2} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={3}>
        <Flex>
          <Box flex={1}>
            <Code
              as={`h${level}` as any}
              language="ts"
              size={_fontSize(fontSize, [0, 0, 1])}
              style={{fontWeight: 700, whiteSpace: 'nowrap'}}
            >
              {data.parameters?.map((p) => p.name).join(', ')}
            </Code>
          </Box>

          <Box flex="none">
            <UnformattedCode>
              <ReleaseTag $tag={data.releaseTag || '@public'}>
                {data.releaseTag || '@public'}
              </ReleaseTag>
            </UnformattedCode>
          </Box>
        </Flex>

        {data.inheritedFrom && (
          <Box marginTop={4}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        )}

        {data.parameters && (
          <Stack marginTop={4} space={3}>
            <Label size={_fontSize(fontSize, [1, 1, 2])}>Parameters</Label>

            <Stack space={3}>
              {data.parameters.map((p) => (
                <TSDocCode
                  deindent
                  key={p._key}
                  size={_fontSize(fontSize, [0, 0, 1])}
                  prefix={`${p.name}: `}
                  tokens={p.type}
                />
              ))}
            </Stack>
          </Stack>
        )}

        {data.returnType && (
          <Stack marginTop={4} space={3}>
            <Label size={_fontSize(fontSize, [1, 1, 2])}>Return type</Label>

            <TSDocCode deindent size={_fontSize(fontSize, [0, 0, 1])} tokens={data.returnType} />
          </Stack>
        )}
      </Box>
    </Card>
  )
}

function ApiContructorMember(props: {
  data: APIMemberWithInheritance<APIConstructor>
  fontSize?: number
  level?: number
  member: APIMember
}) {
  const {data, fontSize = 2, level = 1, member} = props
  const {comment, parameters} = data

  const title = `new ${member.name}(${parameters.map((p) => p.name).join(', ') || ''})`

  return (
    <Card border overflow="hidden" radius={2} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex align="center" padding={3}>
        <Box flex={1}>
          <Code
            as={`h${level}` as any}
            language="ts"
            size={_fontSize(fontSize, [0, 0, 1])}
            style={{fontWeight: 700, whiteSpace: 'nowrap'}}
          >
            {title}
          </Code>
        </Box>

        <Box flex="none">
          <Code size={_fontSize(fontSize, [0, 0, 1])}>
            <ReleaseTag $tag={`@${data.releaseTag || 'public'}`}>
              {`@${data.releaseTag || 'public'}`}
            </ReleaseTag>
          </Code>
        </Box>
      </Flex>

      {data.inheritedFrom && (
        <Box padding={3}>
          <MemberInheritedFrom data={data.inheritedFrom} />
        </Box>
      )}

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <Card borderTop overflow="auto" padding={3} tone="inherit">
          <Label muted size={_fontSize(fontSize, [0, 0, 1])}>
            Parameters
          </Label>

          <Stack marginTop={3} space={3}>
            {data.parameters.map((param) => (
              <TSDocCode
                deindent
                key={param._key}
                prefix={`${param.name}: `}
                size={_fontSize(fontSize, [0, 0, 1])}
                tokens={param.type}
              />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}

function ApiMethodMember(props: {
  data: APIMemberWithInheritance<APIMethod>
  fontSize?: number
  level?: number
  member: APIMember
}) {
  const {data, fontSize = 2, level, member} = props
  const {comment} = data

  const title = useMemo(() => {
    let t = data.isStatic ? `${member.name}.` : ''

    t += `${data.name}(`

    t += data.parameters?.map((p) => p.name).join(', ') || ''

    t += `)`

    return t
  }, [data, member])

  return (
    <Card border overflow="auto" radius={2} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Flex align="center" padding={3}>
        <Box flex={1}>
          <Code as="h3" language="ts" size={_fontSize(fontSize, [0, 0, 1])}>
            {title}
          </Code>
        </Box>

        <Box flex="none">
          <Code size={_fontSize(fontSize, [0, 0, 1])}>
            <ReleaseTag $tag={`@${data.releaseTag || 'public'}`}>
              {`@${data.releaseTag || 'public'}`}
            </ReleaseTag>
          </Code>
        </Box>
      </Flex>

      {data.inheritedFrom && (
        <Box marginTop={3}>
          <MemberInheritedFrom data={data.inheritedFrom} />
        </Box>
      )}

      {/* Parameters */}
      {data.parameters && data.parameters.length > 0 && (
        <Card borderTop padding={3} tone="inherit">
          <Box marginBottom={3}>
            <Label muted size={_fontSize(fontSize, [0, 0, 1])}>
              Parameters
            </Label>
          </Box>

          <Stack space={3}>
            {data.parameters.map((param) => (
              <TSDocCode
                deindent
                key={param._key}
                prefix={`${param.name}: `}
                size={_fontSize(fontSize, [0, 0, 1])}
                tokens={param.type}
              />
            ))}
          </Stack>
        </Card>
      )}

      {/* Return type */}
      {data.returnType && data.returnType.length > 0 && (
        <Card borderTop padding={3} tone="inherit">
          <Box marginBottom={3}>
            <Label muted size={_fontSize(fontSize, [0, 0, 1])}>
              Returns
            </Label>
          </Box>

          <TSDocCode deindent size={_fontSize(fontSize, [0, 0, 1])} tokens={data.returnType} />
        </Card>
      )}

      {comment?.summary && (
        <Card borderTop padding={3}>
          <CommentSummary data={comment} fontSize={fontSize - 1} level={level} />
        </Card>
      )}
    </Card>
  )
}

function ApiMethodSignatureMember(props: {
  data: APIMemberWithInheritance<APIMethodSignature>
  fontSize?: number
  level?: number
  member: APIMember
}) {
  const {data, fontSize = 2, level = 1, member} = props
  const {comment} = data

  const title = useMemo(() => {
    let t = member.name as string

    t += `${data.name}(`

    t += data.parameters?.map((p) => p.name).join(', ') || ''

    t += `)`

    return t
  }, [data, member])

  return (
    <Card border overflow="hidden" radius={2} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={3}>
        <Flex>
          <Box flex={1}>
            <Code
              as={`h${level}` as any}
              language="ts"
              size={_fontSize(fontSize, [1, 1, 2])}
              style={{fontWeight: 700, whiteSpace: 'nowrap'}}
            >
              {title}
            </Code>
          </Box>

          <Box flex="none">
            <Code size={_fontSize(fontSize, [0, 0, 1])}>
              <ReleaseTag $tag={`@${data.releaseTag || 'public'}`}>
                {`@${data.releaseTag || 'public'}`}
              </ReleaseTag>
            </Code>
          </Box>
        </Flex>

        {data.inheritedFrom && (
          <Box marginTop={3}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        )}

        {comment?.summary && (
          <Box padding={3}>
            <CommentSummary data={comment} fontSize={fontSize} />
          </Box>
        )}
      </Box>

      {/* Parameters */}
      {data.parameters && data.parameters.length > 0 && (
        <Card overflow="auto" padding={3} tone="inherit">
          <Box marginBottom={3}>
            <Label size={_fontSize(fontSize, [1, 1, 2])}>Parameters</Label>
          </Box>

          <Stack space={3}>
            {data.parameters.map((param) => (
              <TSDocCode
                deindent
                key={param._key}
                prefix={`${param.name}: `}
                size={_fontSize(fontSize, [0, 0, 1])}
                tokens={param.type}
              />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}

function ApiPropertyMember(props: {
  data: APIMemberWithInheritance<APIProperty>
  fontSize?: number
  level?: number
}) {
  const {data, fontSize = 2, level = 1} = props
  const {
    comment,
    inheritedFrom,
    isEventProperty: _isEventProperty,
    isOptional,
    isStatic,
    name,
    type,
  } = data

  return (
    <Card border overflow="hidden" radius={2} tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={3}>
        <Flex align="flex-start">
          <Box flex={1}>
            <TSDocCode
              prefix={`${isStatic ? 'static ' : ''}${name}${isOptional ? '?' : ''}: `}
              size={_fontSize(fontSize, [0, 0, 1])}
              tokens={type}
            />
          </Box>

          <Box flex="none">
            <Code size={_fontSize(fontSize, [0, 0, 1])}>
              <ReleaseTag $tag={`@${data.releaseTag || 'public'}`}>
                {`@${data.releaseTag || 'public'}`}
              </ReleaseTag>
            </Code>
          </Box>
        </Flex>

        {comment && (
          <Box marginTop={4}>
            <CommentSummary data={comment} fontSize={fontSize - 1} level={level + 1} />
          </Box>
        )}
      </Box>

      {inheritedFrom && (
        <Card padding={3} tone="inherit">
          <Box marginTop={3}>
            <MemberInheritedFrom data={inheritedFrom} fontSize={fontSize} />
          </Box>
        </Card>
      )}
    </Card>
  )
}

function ApiPropertySignature(props: {
  data: APIMemberWithInheritance<APIPropertySignature>
  fontSize?: number
  level?: number
}) {
  const {data, fontSize = 2, level = 1} = props
  const {comment, inheritedFrom, isOptional, name, type} = data

  return (
    <Card border overflow="auto" padding={3} radius={2} tone="inherit">
      <Flex>
        <Box flex={1}>
          <TSDocCode
            deindent
            size={_fontSize(fontSize, [0, 0, 1])}
            prefix={`${name}${isOptional ? '?' : ''}: `}
            tokens={type}
          />
        </Box>

        <Box flex="none">
          <Code size={_fontSize(fontSize, [0, 0, 1])}>
            <ReleaseTag $tag={`@${data.releaseTag || 'public'}`}>
              {`@${data.releaseTag || 'public'}`}
            </ReleaseTag>
          </Code>
        </Box>
      </Flex>

      {comment && (
        <Box marginTop={3}>
          {/* TODO: CommentDeprecatedCallout */}
          <CommentSummary data={comment} fontSize={fontSize} level={level + 1} />
          {/* TODO: CommentRemarks */}
          {/* TODO: CommentExampleBlocks */}
        </Box>
      )}

      {inheritedFrom && (
        <Card marginTop={3} padding={3} tone="inherit">
          <MemberInheritedFrom data={inheritedFrom} fontSize={fontSize} />
        </Card>
      )}
    </Card>
  )
}
