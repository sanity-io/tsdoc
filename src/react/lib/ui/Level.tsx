import {ReactElement, ReactNode} from 'react'
import {LevelContext} from './LevelContext'
import {useLevel} from './useLevel'

export function Level(props: {children?: ReactNode}): ReactElement {
  const {children} = props
  const level = useLevel()

  return <LevelContext.Provider value={level + 1}>{children}</LevelContext.Provider>
}
