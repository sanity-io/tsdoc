import {useContext} from 'react'

import {LevelContext} from './LevelContext'

export function useLevel(): number {
  const levelContext = useContext(LevelContext) || 1

  return levelContext
}
