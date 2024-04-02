import {APIPackage} from '@sanity/tsdoc'
import {TreeItemProps} from '@sanity/ui'
import {ReactElement, useCallback} from 'react'
import {SyntaxText} from '../../components/ColoredCode'
import {compilePath} from '../lib/compilePath'
import {useTSDoc} from '../useTSDoc'
import {SyntaxTreeItem} from './SyntaxTreeItem'

export function PackageTreeItem(
  props: {pkg: APIPackage} & Omit<TreeItemProps, 'href' | 'onClick' | 'text'>,
): ReactElement {
  const {pkg, ...restProps} = props
  const {params, updateParams} = useTSDoc()

  const href = compilePath({
    ...params,
    packageScope: pkg.scope || null,
    packageName: pkg.name,
    releaseVersion: pkg.latestRelease.version,
  })

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()

      updateParams((prev) => ({
        ...prev,
        packageScope: pkg.scope || null,
        packageName: pkg.name,
        releaseVersion: pkg.latestRelease.version,
      }))
    },
    [pkg, updateParams],
  )

  return (
    <SyntaxTreeItem
      {...restProps}
      href={href}
      onClick={handleClick}
      text={<SyntaxText>{[pkg.scope, pkg.name].filter(Boolean).join('/')}</SyntaxText>}
    />
  )
}
