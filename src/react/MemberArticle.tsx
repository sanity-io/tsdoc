import {APIMember} from '@sanity/tsdoc'
import {Badge, Code, Heading, Inline, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'

export function MemberArticle(props: {data: APIMember}): ReactElement {
  const {data} = props

  if (data._type === 'api.class') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  if (data._type === 'api.enum') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  if (data._type === 'api.function') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  if (data._type === 'api.interface') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  if (data._type === 'api.namespace') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  if (data._type === 'api.typeAlias') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  if (data._type === 'api.variable') {
    return (
      <Stack space={4}>
        <Inline space={1}>
          <Badge>{data._type}</Badge>
          <Badge>v{data.release.version}</Badge>
          {data.releaseTag && <Badge>{data.releaseTag}</Badge>}
        </Inline>
        <Heading>
          <code>{data.name}</code>
        </Heading>
        <Code language="json" size={1}>
          {JSON.stringify(data, null, 2)}
        </Code>
      </Stack>
    )
  }

  return <Text>unknown type</Text>
}
