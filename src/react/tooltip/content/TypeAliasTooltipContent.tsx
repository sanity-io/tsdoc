import {APITypeAlias} from '@sanity/tsdoc'
import {Box, Code} from '@sanity/ui'
import {ReactElement} from 'react'
import {_compileTypeAliasDefinition} from '../../app/lib/_compile'
import {CommentBox, CommentSummary} from '../../comment'
import {useTextSize} from '../../lib/ui'

export function TypeAliasTooltipContent(props: {data: APITypeAlias}): ReactElement {
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
          {_compileTypeAliasDefinition(data)}
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
