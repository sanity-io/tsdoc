import {APIToken} from '@sanity/tsdoc'
import {ReactElement, useMemo} from 'react'
import {useMemberLink} from '../app'
import {TSDocAppParams} from '../types'
import {ReferenceTooltip} from './tooltip/ReferenceTooltip'

export function ApiToken(props: {
  deindent?: boolean
  fontSize?: number
  token: APIToken
}): ReactElement {
  const {deindent, fontSize = 2, token} = props
  const text = token.text.replace(/History_2/g, 'History').replace(/React_2/g, 'React')

  const params: TSDocAppParams | null = useMemo(
    () =>
      token.member
        ? {
            exportPath: token.member.export.path,
            memberName: token.member.name,
            packageScope: token.member.package.scope || null,
            packageName: token.member.package.name,
            releaseVersion: token.member.release.version,
          }
        : null,
    [token.member]
  )

  const linkProps = useMemberLink({params})

  if (!token.member || !params) {
    return <>{deindent ? text.replace(/\n\s\s/g, '\n') : text}</>
  }

  return (
    <ReferenceTooltip fontSize={fontSize} member={token.member}>
      <a {...linkProps}>{text}</a>
    </ReferenceTooltip>
  )
}
