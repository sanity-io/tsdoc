import {APIToken} from '@sanity/tsdoc'
import {TSDocAppParams} from '@sanity/tsdoc/store'
import {useMemo} from 'react'

import {useMemberLink} from '../app'
import {Size} from '../lib/ui'
import {ReferenceTooltip} from '../tooltip'

export function ApiToken(props: {deindent?: boolean; token: APIToken}): React.ReactNode {
  const {deindent, token} = props
  const text = token.text.replace(/History_2/g, 'History').replace(/React_2/g, 'React')

  const params: TSDocAppParams | null = useMemo(
    () =>
      token.member && token.member.export
        ? {
            exportPath: token.member.export.path,
            memberName: token.member.name,
            packageScope: token.member.package.scope || null,
            packageName: token.member.package.name,
            releaseVersion: token.member.release.version,
            memberSlug: token.member.slug.current,
          }
        : null,
    [token.member],
  )

  const linkProps = useMemberLink({params})

  if (!token.member || !params) {
    return <>{deindent ? text.replace(/\n\s\s/g, '\n') : text}</>
  }

  return (
    <Size delta={-1}>
      <ReferenceTooltip member={token.member}>
        <a {...linkProps}>{text}</a>
      </ReferenceTooltip>
    </Size>
  )
}
