import {APIEnum} from '@sanity/tsdoc'
import {Box, Code, Container} from '@sanity/ui'
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
          size={_fontSize(fontSize, [0, 0, 1])}
        >{`import {${data.name}} from '${data.export.name}'`}</Code>
      </Box>

      <Box padding={3} overflow="auto">
        <Code language="typescript" size={_fontSize(fontSize, [0, 0, 1])}>
          {/* {_compileEnumDefinition(data)} */}
        </Code>
      </Box>

      {data.comment?.summary && (
        <CommentBox padding={3}>
          <Container width={1}>
            <CommentSummary data={data.comment} fontSize={fontSize} />
          </Container>
        </CommentBox>
      )}
    </>
  )
}