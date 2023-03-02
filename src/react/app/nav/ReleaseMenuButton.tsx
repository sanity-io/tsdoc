import {SelectIcon} from '@sanity/icons'
import {APIPackage, APIRelease} from '@sanity/tsdoc'
import {Button, Menu, MenuButton} from '@sanity/ui'
import {ReactElement} from 'react'
import {SyntaxText} from '../../components/ColoredCode'
import {useSize} from '../../lib/ui'
import {useTSDoc} from '../useTSDoc'
import {SyntaxMenuItem} from './SyntaxMenuItem'

export function ReleaseMenuButton(props: {
  currentPkg: APIPackage
  currentRelease: APIRelease
}): ReactElement {
  const {currentPkg, currentRelease} = props
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
          text={<SyntaxText $syntax="className">{currentRelease.version}</SyntaxText>}
        />
      }
      id="version-menu"
      menu={
        <Menu>
          {currentPkg.releases.map((r) => (
            <SyntaxMenuItem
              fontSize={fontSize}
              key={r.version}
              onClick={() => updateParams((prev) => ({...prev, releaseVersion: r.version}))}
              padding={2}
              selected={currentRelease.version === r.version}
              text={<SyntaxText $syntax="className">{r.version}</SyntaxText>}
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
