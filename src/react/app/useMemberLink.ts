import {TSDocAppParams} from '@sanity/tsdoc/store'
import {MouseEvent, useCallback, useMemo} from 'react'
import {compilePath} from './lib/compilePath'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useMemberLink(props: {params: TSDocAppParams | null}): {
  href: string
  onClick: (event: MouseEvent | KeyboardEvent) => void
} {
  const {params} = props
  const {basePath, onPathChange} = useTSDoc()
  const path = params && compilePath(params)
  const href = useMemo(() => `${basePath}${path || ''}`, [basePath, path])

  const onClick = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      if (!path) return

      event.preventDefault()

      onPathChange(path)
    },
    [onPathChange, path]
  )

  return {href, onClick}
}
