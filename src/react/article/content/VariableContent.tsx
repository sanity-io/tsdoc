import {APIVariable} from '@sanity/tsdoc'
import {Box, Card, Label, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {TSDocSymbol} from '../../app'
import {CommentDeprecatedCallout, CommentExampleBlocks, CommentRemarks} from '../../comment'
import {H, P} from '../../lib/ui'
import {CodeSnippet} from '../CodeSnippet'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'
import {TSVariableParamMember} from '../members/TSVariableParamMember'
import {TSDocCode} from '../TSDocCode'

export function VariableContent(props: {data: APIVariable}): ReactElement {
  const {data} = props
  const {comment, isReactComponentType, propsType, type} = data
  const {parameters = []} = comment || {}

  const propsTypeMembers = useMemo(
    () => (isReactComponentType && propsType ? _getMembers(propsType) : undefined),
    [isReactComponentType, propsType]
  )

  return (
    <>
      {comment && <CommentDeprecatedCallout data={comment} />}

      {isReactComponentType && (
        <>
          <H size={[-1, 0, 1, 2]}>Signature</H>
          <Card border padding={4} radius={3} overflow="auto" tone="inherit">
            <TSDocCode tokens={type} />
          </Card>
        </>
      )}

      {propsType && (
        <Box marginTop={5}>
          <H size={[-1, 0, 1, 2]}>Props</H>

          <P muted size={[-1, 0, 1]}>
            Defined by the{' '}
            <span
              style={{
                display: 'inline-flex',
                verticalAlign: 'middle',
                position: 'relative',
              }}
            >
              <TSDocSymbol border name={propsType.name} padding={2} radius={3} />
            </span>{' '}
            interface.
          </P>

          {propsTypeMembers && (
            <>
              {propsTypeMembers.length > 0 && <Members data={propsTypeMembers} member={data} />}

              {propsTypeMembers.length === 0 && (
                <P muted size={[-1, 0, 1]}>
                  <em>No members.</em>
                </P>
              )}
            </>
          )}
        </Box>
      )}

      {parameters.length > 0 ? (
        <>
          <H size={[-1, 0, 1, 2]}>Parameters</H>
          {parameters.map((param) => (
            <TSVariableParamMember data={param} key={param._key} />
          ))}
        </>
      ) : null}

      {!isReactComponentType && type && (
        <Card border marginTop={5} overflow="auto" padding={4} radius={3} tone="inherit">
          <Box marginBottom={4}>
            <Label muted weight="semibold">
              Type
            </Label>
          </Box>

          <Text muted>
            <CodeSnippet data={type} />
          </Text>
        </Card>
      )}

      {comment && <CommentRemarks data={comment} />}
      {comment && <CommentExampleBlocks data={comment} />}
    </>
  )
}
