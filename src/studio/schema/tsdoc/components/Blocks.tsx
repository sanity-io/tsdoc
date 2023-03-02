import {PortableText, PortableTextProps} from '@portabletext/react'
import {Card, Code, Text} from '@sanity/ui'

const CODE_LANGUAGE: Record<string, string> = {
  tsx: 'typescript',
}

const components: PortableTextProps['components'] = {
  block: {
    normal: ({children}) => (
      <Text as="p" muted>
        {children}
      </Text>
    ),
  },

  types: {
    code: ({value}) => (
      <Card padding={3} tone="transparent">
        <Code language={CODE_LANGUAGE[value?.language || 'tsx']} size={1}>
          {value?.code}
        </Code>
      </Card>
    ),
  },
}

export function Blocks(props: {value?: any[]}) {
  const {value = []} = props

  return <PortableText value={value} components={components} />
}
