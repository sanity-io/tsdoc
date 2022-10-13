import {APIFunction} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {useMemberLink} from '../../../app'
import {_compileFunctionDefinition} from '../../../app/lib/_compile'
import {CommentBox, CommentSummary} from '../../../comment'
import {_fontSize} from '../../../helpers'
import {H, P} from '../../../typography'
import {Members} from '../../members'
import {_getMembers} from '../../members/helpers'

export function FunctionTooltipContent(props: {
  data: APIFunction
  fontSize?: number
}): ReactElement {
  const {data, fontSize = 2} = props
  const level = 3
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
      <Box padding={3}>
        <Code
          language="typescript"
          size={_fontSize(fontSize, [1, 1, 2])}
        >{`import {${data.name}} from '${data.export.name}'`}</Code>
      </Box>

      <Box padding={3} overflow="auto" style={{borderTop: '1px solid var(--card-border-color)'}}>
        <Code language="typescript" size={_fontSize(fontSize, [1, 1, 2])}>
          {_compileFunctionDefinition(data)}
        </Code>
      </Box>

      {propsType && propsTypeMembers && propsTypeMembers.length > 0 && (
        <CommentBox padding={3}>
          <H fontSize={fontSize} level={level}>
            Props
          </H>

          <P fontSize={fontSize}>
            Defined by the{' '}
            <code>
              <a href={propsTypeLink.href} onClick={propsTypeLink?.onClick}>
                {propsType.name}
              </a>
            </code>{' '}
            interface.
          </P>

          {propsTypeMembers.length > 0 && (
            <Members data={propsTypeMembers} fontSize={fontSize} level={level} member={data} />
          )}
        </CommentBox>
      )}

      {data.comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={data.comment} fontSize={fontSize - 1} />
        </CommentBox>
      )}
    </>
  )
}
