import {MouseEvent, useCallback} from 'react'
import {TSDocAppParams} from '../types'
import {_getPath} from './lib/_getPath'
import {useTSDoc} from './useTSDoc'

/** @beta */
export function useMemberLink(props: {params: TSDocAppParams | null}): {
  href: string
  onClick: (event: MouseEvent) => void
} {
  const {params} = props
  const {onPathChange} = useTSDoc()
  const href = params ? _getPath(params) : null

  const onClick = useCallback(
    (event: MouseEvent) => {
      if (!href) return

      event.preventDefault()

      onPathChange(href)
    },
    [href, onPathChange]
  )

  return {href: href || '/', onClick}
}
