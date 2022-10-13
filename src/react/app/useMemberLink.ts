import {MouseEvent, useCallback, useMemo} from 'react'
import {TSDocAppParams} from '../types'
import {_getPath} from './lib/_getPath'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useMemberLink(props: {params: TSDocAppParams | null}): {
  href: string
  onClick: (event: MouseEvent) => void
} {
  const {params} = props
  const {basePath, onPathChange} = useTSDoc()

  const path = params && _getPath(params)

  const href = useMemo(() => {
    if (!path) return basePath || '/'

    return `${basePath}${path}`
  }, [basePath, path])

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (!path) return

      event.preventDefault()

      onPathChange(path)
    },
    [onPathChange, path]
  )

  return {href: href || '/', onClick}
}
