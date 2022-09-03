import {APIFunction} from '@sanity/tsdoc'
import {Box, Card, Code, Heading, Stack, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
// import {APIFunction, APIParameter} from '../../../lib/api'
import {
  CommentDeprecatedCallout,
  CommentExampleBlocks,
  CommentRemarks,
  CommentSummary,
} from '../comment'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'
// import {Tokens} from '../Tokens'
import {TSDocCode} from '../TSDocCode'

export function FunctionContent(props: {data: APIFunction}): ReactElement {
  const {data} = props
  const {comment, isReactComponentType, name, parameters, propsType, returnType, typeParameters} =
    data

  const propsTypeMembers = useMemo(() => propsType && _getMembers(propsType), [propsType])
  const codePrefix = useMemo(
    () =>
      parameters &&
      `function ${name}(${parameters
        .map((param) => {
          return `${param.name}: ${param.type.map((t) => t.text).join('')}`
        })
        .join(', ')}): `,
    [name, parameters]
  )

  return (
    <Stack>
      {comment?.deprecated?.content && (
        <Box marginTop={4}>
          <CommentDeprecatedCallout data={comment} />
        </Box>
      )}

      {comment?.summary && (
        <Box marginTop={4}>
          <CommentSummary data={comment} />
        </Box>
      )}

      {!isReactComponentType && !propsType && returnType && (
        <Box marginTop={6}>
          <Box marginBottom={4}>
            <Heading as="h2" size={1}>
              Signature
            </Heading>
          </Box>

          <Card border padding={4} radius={2} tone="inherit">
            {/* <Text muted size={1} style={{fontFamily: 'SF Mono', whiteSpace: 'pre'}}>
              <Tokens data={returnType} prefix={codePrefix} />
            </Text> */}
            <TSDocCode prefix={codePrefix} size={1} tokens={returnType} />
          </Card>
        </Box>
      )}

      {/* Parameters */}
      {!isReactComponentType && parameters && parameters.length > 0 && (
        <Box marginTop={6}>
          <Box marginBottom={4}>
            <Heading as="h2" size={1}>
              Parameters
            </Heading>
          </Box>

          <Card border padding={4} radius={2} tone="inherit">
            <Stack space={3}>
              {parameters.map((param) => (
                <TSDocCode
                  key={param.name}
                  prefix={`${param.name}: `}
                  size={1}
                  tokens={param.type}
                />
                // <Text
                //   key={param._key}
                //   muted
                //   size={1}
                //   style={{fontFamily: 'SF Mono', whiteSpace: 'pre'}}
                // >
                //   <Tokens data={param.type} prefix={`${param.name}: `} />
                // </Text>
              ))}
            </Stack>
          </Card>
        </Box>
      )}

      {comment?.remarks?.content && (
        <Box marginTop={6}>
          <CommentRemarks data={comment} />
        </Box>
      )}

      {propsType && propsTypeMembers && (
        <Box marginTop={6}>
          <Heading as="h2" size={1}>
            Props
          </Heading>

          <Box marginTop={3}>
            <Text as="p" muted size={1}>
              Defined by the{' '}
              <code>
                {/* <Link href={`/release/${params.version}/${propsType.slug?.current}`}> */}
                <a>{propsType.name as any}</a>
                {/* </Link> */}
              </code>{' '}
              interface .
            </Text>
          </Box>

          <Box marginTop={4}>
            {propsTypeMembers.length > 0 && <Members data={propsTypeMembers} member={data} />}

            {propsTypeMembers.length === 0 && (
              <Text as="p">
                <em>No members.</em>
              </Text>
            )}
          </Box>
        </Box>
      )}

      {typeParameters && (
        <Box marginTop={6}>
          <Heading as="h2" size={1}>
            Type parameters
          </Heading>

          <Box marginTop={4}>
            <Code language="json" size={1}>
              {JSON.stringify(typeParameters, null, 2)}
            </Code>
          </Box>
        </Box>
      )}

      {comment && <CommentExampleBlocks data={comment} />}
    </Stack>
  )
}
