import {PortableTextTypeComponentProps} from '@portabletext/react'
import {Card, Code} from '@sanity/ui'

const CODE_LANGUAGES: Record<string, string> = {
  tsx: 'ts',
}

export function CodeBlock(
  props: PortableTextTypeComponentProps<{_type: 'code'; code: string; language: string}>
) {
  const {value} = props

  return (
    <Card border marginY={5} padding={3} radius={2}>
      <Code language={CODE_LANGUAGES[value.language] || value.language} size={[1, 1, 1, 2]}>
        {value.code}
      </Code>
    </Card>
  )
}
