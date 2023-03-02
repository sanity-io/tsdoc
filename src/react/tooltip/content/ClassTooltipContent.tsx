import {APIClass} from '@sanity/tsdoc'
import {Box, Card, Code} from '@sanity/ui'
import {ReactElement} from 'react'
import {_compileClassDefinition} from '../../app/lib/_compile'
import {CommentBox, CommentSummary} from '../../comment'
import {useTextSize} from '../../lib/ui'

export function ClassTooltipContent(props: {data: APIClass}): ReactElement {
  const {data} = props

  return (
    <>
      <Box padding={3}>
        <Code
          language="typescript"
          size={useTextSize([-1, 0, 1])}
        >{`import {${data.name}} from '${data.export.name}'`}</Code>
      </Box>

      <Card borderTop padding={3} overflow="auto">
        <Code language="typescript" size={useTextSize([-1, 0, 1])}>
          {_compileClassDefinition(data)}
        </Code>
      </Card>

      {data.comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={data.comment} />
        </CommentBox>
      )}
    </>
  )
}
