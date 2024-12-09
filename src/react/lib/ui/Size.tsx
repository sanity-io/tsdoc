import {useContext} from 'react'

import {SizeContext} from './SizeContext'

export function Size(props: {delta: number; children?: React.ReactNode}): React.ReactNode {
  const {delta, children} = props
  const parentSize = useContext(SizeContext)
  const size = parentSize + delta

  return <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
}
