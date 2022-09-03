import {ReactElement, ReactNode, useCallback, useMemo} from 'react'
import {RenderLinkCallback, TSDocContext} from './TSDocContext'

export function TSDocProvider(props: {
  children: ReactNode
  renderLink?: RenderLinkCallback
}): ReactElement {
  const {children, renderLink: renderLinkProp} = props

  const renderLink: RenderLinkCallback = useCallback((linkProps) => {
    return <>{linkProps.children}</>
  }, [])

  const tsdoc = useMemo(
    () => ({renderLink: renderLinkProp || renderLink}),
    [renderLink, renderLinkProp]
  )

  return <TSDocContext.Provider value={tsdoc}>{children}</TSDocContext.Provider>
}
