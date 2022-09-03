import {
  APICallSignature,
  APIConstructor,
  APIMember,
  APIMethod,
  APIMethodSignature,
  APIProperty,
  APIPropertySignature,
} from '@sanity/tsdoc'
import {
  Badge,
  BadgeTone,
  Box,
  Card,
  Code,
  Flex,
  Heading,
  Inline,
  Label,
  Stack,
  Text,
} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import styled from 'styled-components'
import {Comment} from '../comment'
import {ClassContent} from '../content/ClassContent'
import {InterfaceContent} from '../content/InterfaceContent'
import {TSDocCode} from '../TSDocCode'
import {APIMemberWithInheritance} from './_types'

function getBadges(data: {
  releaseTag?: 'alpha' | 'beta' | 'internal' | 'public'
}): {text: string; tone: BadgeTone}[] {
  return [
    data.releaseTag === 'beta' && {
      text: 'Beta',
      tone: 'caution' as BadgeTone,
    },
  ].filter(Boolean) as {text: string; tone: BadgeTone}[]
}

const MemberStack = styled(Stack)`
  & > div + div {
    border-top: 1px solid var(--card-border-color);
  }
`

export function Members(props: {
  data: APIMemberWithInheritance[]
  member: APIMember
}): ReactElement {
  const {data, member} = props

  return (
    <Card border overflow="hidden" radius={2}>
      <MemberStack>
        {data.map((m) => m && <Member data={m} key={m._key} member={member} />)}
      </MemberStack>
    </Card>
  )
}

function Member(props: {data: APIMemberWithInheritance; member: APIMember}) {
  const {data, member} = props

  if (data._type === 'api.constructor') {
    return <ApiContructorMember data={data} member={member} />
  }

  if (data._type === 'api.method') {
    return <ApiMethodMember data={data} member={member} />
  }

  if (data._type === 'api.property') {
    return <ApiPropertyMember data={data} />
  }

  if (data._type === 'api.propertySignature') {
    return <PropertySignature data={data} />
  }

  if (data._type === 'api.callSignature') {
    return <ApiCallSignatureMember data={data} />
  }

  if (data._type === 'api.methodSignature') {
    return <ApiMethodSignatureMember data={data} member={member} />
  }

  if (data._type === 'api.constructSignature') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.indexSignature') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.class') {
    return <ClassContent member={data} />
  }

  if (data._type === 'api.enum') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.enumMember') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.function') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.interface') {
    return <InterfaceContent data={data} />
  }

  if (data._type === 'api.namespace') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.typeAlias') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  if (data._type === 'api.variable') {
    return (
      <Card padding={3} tone="critical">
        <Text size={1}>TODO</Text>
      </Card>
    )
  }

  return (
    <Card padding={3} tone="critical">
      <Text size={1}>
        Unexpected member type: <code>{(data as any)._type}</code>
      </Text>
    </Card>
  )
}

function MemberBadges(props: {badges: {tone?: BadgeTone; text?: string}[]}) {
  const {badges} = props

  return (
    <Inline space={2} style={{lineHeight: 0}}>
      {badges.map((badge, badgeIndex) => (
        <Badge
          fontSize={0}
          key={badgeIndex}
          mode="outline"
          tone={badge.tone}
          style={{margin: '-4px 0'}}
        >
          {badge.text}
        </Badge>
      ))}
    </Inline>
  )
}

function MemberInheritedFrom(props: {data: {name: string; slug?: string}}) {
  const {data} = props
  // const {exportName, packageScope, packageName, version} = useAPIMember()
  // const path = [packageScope, packageName, version, exportName, data.name].filter(Boolean).join('/')
  // const href = `/reference/${path}`

  return (
    <Text as="p" muted size={1}>
      Inherited from{' '}
      {data.slug && (
        <code>
          {/* <Link href={href}> */}
          <a>{data.name}</a>
          {/* </Link> */}
        </code>
      )}
      {!data.slug && <code>{data.name}</code>}.
    </Text>
  )
}

function ApiCallSignatureMember(props: {data: APIMemberWithInheritance<APICallSignature>}) {
  const {data} = props
  const {comment} = data
  const badges = useMemo(() => getBadges(data), [data])

  return (
    <Card overflow="hidden" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={3}>
        <Flex align="center" style={{lineHeight: 0}}>
          <Heading as="h3" size={0}>
            <code>({data.parameters?.map((p) => p.name).join(', ')})</code>
          </Heading>

          {badges.length > 0 && (
            <Box marginLeft={2}>
              <MemberBadges badges={badges} />
            </Box>
          )}
        </Flex>

        {data.inheritedFrom && (
          <Box marginTop={4}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        )}

        {data.parameters && (
          <Stack marginTop={4} space={3}>
            <Label size={1}>Parameters</Label>

            <Stack space={3}>
              {data.parameters.map((p) => (
                <TSDocCode deindent key={p._key} size={1} prefix={`${p.name}: `} tokens={p.type} />
              ))}
            </Stack>
          </Stack>
        )}

        {data.returnType && (
          <Stack marginTop={4} space={3}>
            <Label size={1}>Return type</Label>

            <TSDocCode deindent size={1} tokens={data.returnType} />
          </Stack>
        )}

        {comment && <Comment data={comment} fontSize={1} marginTop={4} />}
      </Box>
    </Card>
  )
}

function ApiContructorMember(props: {
  data: APIMemberWithInheritance<APIConstructor>
  member: APIMember
}) {
  const {data, member} = props
  const {comment, parameters} = data
  const badges = useMemo(() => getBadges(data), [data])

  const title = `new ${member.name}(${parameters.map((p) => p.name).join(', ') || ''})`

  return (
    <Card overflow="hidden" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={4}>
        <Flex align="center" marginTop={3} style={{lineHeight: 0}}>
          <Code as="h3" language="ts" size={1} style={{fontWeight: 700, whiteSpace: 'nowrap'}}>
            {title}
          </Code>

          {badges.length > 0 && (
            <Box marginLeft={2}>
              <MemberBadges badges={badges} />
            </Box>
          )}
        </Flex>

        {data.inheritedFrom && (
          <Box marginTop={3}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        )}

        {comment && (
          <Box marginTop={4}>
            <Comment data={comment} fontSize={1} />
          </Box>
        )}
      </Box>

      {/* Parameters */}
      {parameters && parameters.length > 0 && (
        <Card borderTop overflow="auto" padding={4} tone="inherit">
          <Box marginBottom={3}>
            <Label size={1}>Parameters</Label>
          </Box>

          <Stack space={3}>
            {data.parameters.map((param) => (
              <TSDocCode
                deindent
                key={param._key}
                prefix={`${param.name}: `}
                size={1}
                tokens={param.type}
              />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}

function ApiMethodMember(props: {data: APIMemberWithInheritance<APIMethod>; member: APIMember}) {
  const {data, member} = props
  const {comment} = data

  const title = useMemo(() => {
    let t = data.isStatic ? `${member.name}.` : ''

    t += `${data.name}(`

    t += data.parameters?.map((p) => p.name).join(', ') || ''

    t += `)`

    return t
  }, [data, member])

  return (
    <Card overflow="auto" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={4}>
        <Flex align="center" marginTop={3} style={{lineHeight: 0}}>
          <Code as="h3" language="ts" size={1} style={{fontWeight: 700, whiteSpace: 'nowrap'}}>
            {title}
          </Code>
        </Flex>

        {data.inheritedFrom && (
          <Box marginTop={3}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        )}

        {comment && (
          <Box marginTop={4}>
            <Comment data={comment} fontSize={1} marginTop={4} />
          </Box>
        )}

        {/* Parameters */}
        {data.parameters && data.parameters.length > 0 && (
          <Card marginTop={4} tone="inherit">
            <Box marginBottom={3}>
              <Label size={1}>Parameters</Label>
            </Box>

            <Stack space={3}>
              {data.parameters.map((param) => (
                <TSDocCode
                  deindent
                  key={param._key}
                  prefix={`${param.name}: `}
                  size={1}
                  tokens={param.type}
                />
              ))}
            </Stack>
          </Card>
        )}

        {/* Return type */}
        {data.returnType && data.returnType.length > 0 && (
          <Card marginTop={4} tone="inherit">
            <Box marginBottom={3}>
              <Label size={1}>Returns</Label>
            </Box>

            <TSDocCode deindent size={1} tokens={data.returnType} />
          </Card>
        )}
      </Box>
    </Card>
  )
}

function ApiMethodSignatureMember(props: {
  data: APIMemberWithInheritance<APIMethodSignature>
  member: APIMember
}) {
  const {data, member} = props
  const {comment} = data
  const badges = useMemo(() => getBadges(data), [data])

  const title = useMemo(() => {
    let t = member.name as string

    t += `${data.name}(`

    t += data.parameters?.map((p) => p.name).join(', ') || ''

    t += `)`

    return t
  }, [data, member])

  return (
    <Card overflow="hidden" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={3}>
        <Flex align="center" marginTop={3} style={{lineHeight: 0}}>
          <Code as="h3" language="ts" size={1} style={{fontWeight: 700, whiteSpace: 'nowrap'}}>
            {title}
          </Code>

          {badges.length > 0 && <MemberBadges badges={badges} />}
        </Flex>

        {data.inheritedFrom && (
          <Box marginTop={3}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        )}

        {comment && (
          <Box marginTop={4}>
            <Comment data={comment} fontSize={1} marginTop={4} />
          </Box>
        )}
      </Box>

      {/* Parameters */}
      {data.parameters && data.parameters.length > 0 && (
        <Card overflow="auto" padding={3} tone="inherit">
          <Box marginBottom={3}>
            <Label size={1}>Parameters</Label>
          </Box>

          <Stack space={3}>
            {data.parameters.map((param) => (
              <TSDocCode
                deindent
                key={param._key}
                prefix={`${param.name}: `}
                size={1}
                tokens={param.type}
              />
            ))}
          </Stack>
        </Card>
      )}
    </Card>
  )
}

function ApiPropertyMember(props: {data: APIMemberWithInheritance<APIProperty>}) {
  const {data} = props
  const {comment, name, type} = data

  return (
    <Card overflow="hidden" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={4}>
        <Flex align="center" style={{lineHeight: 0}}>
          <TSDocCode prefix={`${name}: `} size={1} tokens={type} />
        </Flex>

        {comment && (
          <Box marginTop={4}>
            <Comment data={comment} fontSize={1} />
          </Box>
        )}
      </Box>

      {data.inheritedFrom && (
        <Card padding={3} tone="inherit">
          <Box marginTop={3}>
            <MemberInheritedFrom data={data.inheritedFrom} />
          </Box>
        </Card>
      )}
    </Card>
  )
}

function PropertySignature(props: {data: APIMemberWithInheritance<APIPropertySignature>}) {
  const {comment, inheritedFrom, isOptional, name, type} = props.data

  return (
    <Card overflow="hidden" tone={comment?.deprecated ? 'critical' : 'inherit'}>
      <Box padding={4}>
        <Flex align="center" style={{lineHeight: 0}}>
          <Flex>
            <Box flex={1}>
              <TSDocCode
                deindent
                size={1}
                prefix={`${name}${isOptional ? '?' : ''}: `}
                tokens={type}
              />
            </Box>
          </Flex>
        </Flex>

        {comment && (
          <Box marginTop={4}>
            <Comment data={comment} fontSize={0} />
          </Box>
        )}
      </Box>

      {inheritedFrom && (
        <Card padding={3} tone="inherit">
          <Box marginTop={3}>
            <MemberInheritedFrom data={inheritedFrom} />
          </Box>
        </Card>
      )}
    </Card>
  )
}
