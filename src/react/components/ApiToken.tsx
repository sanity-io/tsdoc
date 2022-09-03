import {APIToken} from '@sanity/tsdoc'
import {ReactElement, useMemo} from 'react'
import {useTSDoc} from '../useTSDoc'
import {ReferenceTooltip} from './ReferenceTooltip'

export function ApiToken(props: {deindent?: boolean; token: APIToken}): ReactElement {
  const {deindent, token} = props
  const {renderLink} = useTSDoc()
  const text = token.text.replace(/History_2/g, 'History').replace(/React_2/g, 'React')

  const params = useMemo(
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
    []
  )

  if (!token.member || !params) {
    return <>{deindent ? text.replace(/\n\s\s/g, '\n') : text}</>
  }

  return (
    <ReferenceTooltip member={token.member}>
      {renderLink({children: <a>{text}</a>, params})}
    </ReferenceTooltip>
  )
}
