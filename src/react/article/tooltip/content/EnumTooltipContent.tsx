import {APIEnum} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'
import {ReactElement} from 'react'
import {CommentBox, CommentSummary} from '../../../comment'
import {_fontSize} from '../../../helpers'

export function EnumTooltipContent(props: {data: APIEnum; fontSize?: number}): ReactElement {
  const {data, fontSize = 2} = props

  return (
    <>
      <Box padding={3} style={{borderBottom: '1px solid var(--card-border-color)'}}>
        <Code
          language="typescript"
          size={_fontSize(fontSize, [1, 1, 2])}
        >{`import {${data.name}} from '${data.export.name}'`}</Code>
      </Box>

      <Box padding={3} overflow="auto">
        <Code language="typescript" size={_fontSize(fontSize, [1, 1, 2])}>
          {/* {_compileEnumDefinition(data)} */}
        </Code>
      </Box>

      {data.comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={data.comment} fontSize={fontSize - 1} />
        </CommentBox>
      )}
    </>
  )
}
