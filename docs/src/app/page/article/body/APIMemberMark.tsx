import {PortableTextMarkComponentProps} from '@portabletext/react'
import {TSDocSymbolTooltip} from '@sanity/tsdoc/react'

export function APIMemberMark(
  props: PortableTextMarkComponentProps<{
    _type: 'member'
    _key: string
    data?: {name: string; package: {scope: string | null; name: string}}
  }>
) {
  const {children, value} = props
  const member = value?.data

  if (!member) {
    return <code>{children}</code>
  }

  return (
    <TSDocSymbolTooltip
      name={member.name}
      packageScope={member.package.scope}
      packageName={member.package.name}
      portal
    >
      <code>{children}</code>
    </TSDocSymbolTooltip>
  )
}
