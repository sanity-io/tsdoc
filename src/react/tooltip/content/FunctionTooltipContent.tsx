import {APIFunction} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {useMemberLink} from '../../app'
import {_compileFunctionDefinition} from '../../app/lib/_compile'
import {Members} from '../../article/members'
import {_getMembers} from '../../article/members/helpers'
import {CommentBox, CommentSummary} from '../../comment'
import {H, P, useTextSize} from '../../lib/ui'

export function FunctionTooltipContent(props: {data: APIFunction}): ReactElement {
  const {data} = props
  const {propsType} = data

  const propsTypeMembers = useMemo(() => propsType && _getMembers(propsType), [propsType])

  const propsTypeLinkParams = useMemo(
    () =>
      propsType && {
        exportPath: propsType.export?.path,
        packageName: propsType.package?.name,
        packageScope: propsType.package?.scope || null,
        memberName: propsType.name,
        releaseVersion: propsType.release?.version,
      },
    [propsType]
  )

  const propsTypeLink = useMemberLink({
    params: propsTypeLinkParams || null,
  })

  return (
    <>
      <Box overflow="auto" padding={3}>
        <Code
          language="typescript"
          size={useTextSize([-1, 0, 1])}
        >{`import {${data.name}} from '${data.export.name}'`}</Code>
      </Box>

      <Box padding={3} overflow="auto" style={{borderTop: '1px solid var(--card-border-color)'}}>
        <Code language="typescript" size={useTextSize([-1, 0, 1])}>
          {_compileFunctionDefinition(data)}
        </Code>
      </Box>

      {propsType && propsTypeMembers && propsTypeMembers.length > 0 && (
        <CommentBox padding={3}>
          <H size={[-1, 0, 1, 2]}>Props</H>

          <P size={[-1, 0, 1]}>
            Defined by the{' '}
            <code>
              <a href={propsTypeLink.href} onClick={propsTypeLink?.onClick}>
                {propsType.name}
              </a>
            </code>{' '}
            interface.
          </P>

          {propsTypeMembers.length > 0 && <Members data={propsTypeMembers} member={data} />}
        </CommentBox>
      )}

      {data.comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={data.comment} />
        </CommentBox>
      )}
    </>
  )
}
