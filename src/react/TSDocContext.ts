import {createContext, ReactElement, ReactNode} from 'react'

export type RenderLinkCallback = (props: {
  children: ReactNode
  params: {
    exportPath: string
    memberName: string
    packageScope: string | null
    packageName: string
    releaseVersion: string
  }
}) => ReactElement

export interface TSDocContextValue {
  renderLink: RenderLinkCallback
}

export const TSDocContext = createContext<TSDocContextValue | null>(null)
