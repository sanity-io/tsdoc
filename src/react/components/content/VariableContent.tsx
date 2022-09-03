import {APIVariable} from '@sanity/tsdoc'
import {Box, Card, Heading, Label, Stack, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
// import {APIVariable, FIXME} from '../../../lib/api'
import {CommentDeprecatedCallout, CommentRemarks, CommentSummary} from '../comment'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'
import {Tokens} from '../Tokens'

type FIXME = any

export function VariableContent(props: {data: APIVariable}): ReactElement {
  const {data} = props
  const {comment, isReactComponentType, propsType, type} = data

  const propsTypeMembers = useMemo(
    () => (isReactComponentType && propsType ? _getMembers(propsType) : undefined),
    [isReactComponentType, propsType]
  )

  return (
    <Stack>
      {comment && <CommentDeprecatedCallout data={comment} />}
      {comment && <CommentSummary data={comment} />}
      {comment && <CommentRemarks data={comment} />}

      {propsType && propsTypeMembers && (
        <Box marginTop={5}>
          <Heading as="h2" size={1}>
            Props
          </Heading>

          <Box marginTop={3}>
            <Text as="p" muted size={1}>
              Defined by the{' '}
              <code>
                <a>{propsType.name as FIXME}</a>
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

      {!isReactComponentType && type && (
        <Card border marginTop={5} overflow="auto" padding={4} radius={2} tone="inherit">
          <Box marginBottom={3}>
            <Label muted size={0}>
              Type
            </Label>
          </Box>

          <Text muted size={1} style={{fontFamily: 'SF Mono', whiteSpace: 'pre'}}>
            <Tokens data={type} />
          </Text>
        </Card>
      )}
    </Stack>
  )
}
