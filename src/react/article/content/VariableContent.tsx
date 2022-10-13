import {APIVariable} from '@sanity/tsdoc'
import {Box, Card, Label, Text} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {CommentDeprecatedCallout, CommentExampleBlocks, CommentRemarks} from '../../comment'
import {_fontSize} from '../../helpers'
import {H, P} from '../../typography'
import {CodeSnippet} from '../CodeSnippet'
import {Members} from '../members'
import {_getMembers} from '../members/helpers'

export function VariableContent(props: {
  data: APIVariable
  fontSize?: number
  level?: number
}): ReactElement {
  const {data, fontSize = 2, level = 1} = props
  const {comment, isReactComponentType, propsType, type} = data

  const propsTypeMembers = useMemo(
    () => (isReactComponentType && propsType ? _getMembers(propsType) : undefined),
    [isReactComponentType, propsType]
  )

  return (
    <>
      {comment && <CommentDeprecatedCallout data={comment} fontSize={fontSize} />}

      {propsType && (
        <Box marginTop={5}>
          <H fontSize={fontSize} level={level}>
            Props
          </H>

          <P fontSize={fontSize}>
            Defined by the{' '}
            <code>
              <a>{propsType.name}</a>
            </code>{' '}
            interface.
          </P>

          {propsTypeMembers && (
            <>
              {propsTypeMembers.length > 0 && (
                <Members data={propsTypeMembers} fontSize={fontSize} level={level} member={data} />
              )}

              {propsTypeMembers.length === 0 && (
                <P fontSize={fontSize}>
                  <em>No members.</em>
                </P>
              )}
            </>
          )}
        </Box>
      )}

      {!isReactComponentType && type && (
        <Card border marginTop={5} overflow="auto" padding={4} radius={2} tone="inherit">
          <Box marginBottom={3}>
            <Label muted size={_fontSize(fontSize, [1, 1, 2])}>
              Type
            </Label>
          </Box>

          <Text muted size={_fontSize(fontSize, [1, 1, 2])}>
            <CodeSnippet data={type} fontSize={fontSize - 1} />
          </Text>
        </Card>
      )}

      {comment && <CommentRemarks data={comment} />}
      {comment && <CommentExampleBlocks data={comment} />}
    </>
  )
}
