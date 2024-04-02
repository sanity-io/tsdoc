import {SelectIcon} from '@sanity/icons'
import {APIPackage} from '@sanity/tsdoc'
import {Button, Menu, MenuButton} from '@sanity/ui'
import {ReactElement} from 'react'

import {SyntaxText} from '../../components/ColoredCode'
import {useSize} from '../../lib/ui'
import {useTSDoc} from '../useTSDoc'
import {SyntaxMenuItem} from './SyntaxMenuItem'

export function PackageMenuButton(props: {
  currentPkg: APIPackage
  packages: APIPackage[]
}): ReactElement {
  const {currentPkg, packages} = props
  const {updateParams} = useTSDoc()
  const fontSize = useSize()

  return (
    <MenuButton
      button={
        <Button
          fontSize={fontSize}
          iconRight={SelectIcon}
          mode="bleed"
          padding={2}
          text={
            <SyntaxText>{[currentPkg.scope, currentPkg.name].filter(Boolean).join('/')}</SyntaxText>
          }
        />
      }
      id="package-menu"
      menu={
        <Menu>
          {packages.map((p) => (
            <SyntaxMenuItem
              fontSize={fontSize}
              key={p.name}
              onClick={() => {
                updateParams((prev) => ({
                  ...prev,
                  exportPath: null,
                  packageScope: p.scope || null,
                  packageName: p.name,
                  releaseVersion: p.latestRelease.version,
                  memberName: null,
                }))
              }}
              padding={2}
              text={<SyntaxText>{[p.scope, p.name].filter(Boolean).join('/')}</SyntaxText>}
            />
          ))}
        </Menu>
      }
      popover={{
        constrainSize: true,
        matchReferenceWidth: true,
        portal: true,
      }}
    />
  )
}
