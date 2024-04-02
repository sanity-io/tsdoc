import {TSDocComment as TSDocCommentType} from '@sanity/tsdoc'
import {Card, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'
import {ObjectInputProps} from 'sanity'

import {Blocks} from './Blocks'

export function TsdocComment(props: ObjectInputProps<TSDocCommentType>): ReactElement {
  const {
    customBlocks,
    deprecated,
    exampleBlocks,
    // modifierTags,
    // parameters,
    // remarks,
    // returns,
    seeBlocks,
    summary,
    // ...rest
  } = props.value || {}

  if (!deprecated && !exampleBlocks && !seeBlocks && !summary) {
    return (
      <Card padding={3} radius={2} tone="caution">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            No comment
          </Text>
          <Text muted>No extracted tsdoc comment.</Text>
        </Stack>
      </Card>
    )
  }

  return (
    <Stack space={4}>
      {deprecated && (
        <Card padding={3} radius={2} tone="caution">
          <Stack space={3}>
            <Text size={1} weight="semibold">
              Deprecated
            </Text>
            <Blocks value={deprecated.content || []} />
          </Stack>
        </Card>
      )}

      {summary && <Blocks value={summary || []} />}

      {exampleBlocks &&
        exampleBlocks.length > 0 &&
        exampleBlocks.map((exampleBlock, i) => {
          return (
            <Stack key={exampleBlock._key} space={3}>
              <Text size={1} weight="semibold">
                Example #{i + 1}
              </Text>
              <Blocks value={exampleBlock.content || []} />
            </Stack>
          )
        })}

      {customBlocks && (
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Custom blocks
          </Text>

          <Stack space={1}>
            {customBlocks.map((block) => (
              <Card key={block._key} padding={3} radius={2} tone="transparent">
                <div>{block.tag}</div>
                <Blocks value={block?.content || []} />
              </Card>
            ))}
          </Stack>
        </Stack>
      )}

      {seeBlocks && (
        <Stack space={3}>
          <Text size={1} weight="semibold">
            See also
          </Text>

          <Stack space={1}>
            {seeBlocks.map((block) => (
              <Card key={block._key} padding={3} radius={2} tone="transparent">
                <Blocks value={block?.content || []} />
              </Card>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
