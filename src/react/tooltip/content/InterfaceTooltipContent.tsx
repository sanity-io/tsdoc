import {APIInterface} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'

import {_compileInterfaceDefinition} from '../../app/lib/_compile'
import {CommentBox, CommentSummary} from '../../comment'
import {useTextSize} from '../../lib/ui'

export function InterfaceTooltipContent(props: {data: APIInterface}): React.ReactNode {
  const {data} = props

  return (
    <>
      <Box padding={3} style={{borderBottom: '1px solid var(--card-border-color)'}}>
        <Code
          language="typescript"
          size={useTextSize([-1, 0, 1])}
        >{`import {${data.name}} from '${data.export.name}'`}</Code>
      </Box>

      <Box padding={3} overflow="auto">
        <Code language="typescript" size={useTextSize([-1, 0, 1])}>
          {_compileInterfaceDefinition(data)}
        </Code>
      </Box>

      {data.comment?.summary && (
        <CommentBox padding={3}>
          <CommentSummary data={data.comment} />
        </CommentBox>
      )}
    </>
  )
}
