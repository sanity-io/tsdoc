import {DotIcon} from '@sanity/icons'
import {APIMember, APINamespace, SanityArrayItem} from '@sanity/tsdoc'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {Fragment, ReactElement, ReactNode, useMemo, useState} from 'react'
import {ReleaseTag} from '../components/ReleaseTag'
import {UnformattedCode} from '../components/UnformattedCode'
import {_fontSize} from '../helpers'
import {TSDocAppParams, TSDocExportData} from '../types'
import {useMemberLink} from './useMemberLink'

export function TSDocExportNavigation(props: {
  data: TSDocExportData
  fontSize?: number
  path: string
}): ReactElement {
  const {path, data: exp, fontSize = 2} = props
  const [expanded, setExpanded] = useState(false)

  // special react members
  const reactComponents = exp.members.filter(
    (mem) =>
      (mem._type === 'api.class' || mem._type === 'api.function' || mem._type === 'api.variable') &&
      mem.isReactComponentType
  )
  const reactHooks = exp.members.filter((mem) => mem._type === 'api.function' && mem.isReactHook)

  const classes = exp.members.filter(
    (mem) => !reactComponents.includes(mem) && mem._type === 'api.class'
  )
  const enums = exp.members.filter((mem) => mem._type === 'api.enum')
  const functions = exp.members.filter(
    (mem) =>
      !reactComponents.includes(mem) && !reactHooks.includes(mem) && mem._type === 'api.function'
  )
  const interfaces = exp.members.filter((mem) => mem._type === 'api.interface')
  const namespaces = exp.members.filter((mem) => mem._type === 'api.namespace')
  const typeAliases = exp.members.filter((mem) => mem._type === 'api.typeAlias')
  const variables = exp.members.filter(
    (mem) => !reactComponents.includes(mem) && mem._type === 'api.variable'
  )

  return (
    <Stack space={2}>
      <Flex gap={2}>
        <Card as="button" onClick={() => setExpanded((v) => !v)} padding={2} radius={2}>
          <Box flex={1}>
            <Text muted={!expanded} size={_fontSize(fontSize, [0, 0, 1])} weight="medium">
              <UnformattedCode>{exp.name}</UnformattedCode>
            </Text>
          </Box>
        </Card>

        <Box flex="none" hidden={!expanded}>
          <Button
            disabled
            fontSize={_fontSize(fontSize, [0, 0, 1])}
            mode="bleed"
            padding={2}
            text={<UnformattedCode>{`v${exp.release.version}`}</UnformattedCode>}
          />
        </Box>
      </Flex>

      {expanded && (
        <Stack paddingLeft={3} space={2}>
          {reactComponents.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={reactComponents}
              path={path}
              renderMemberName={(mem) => `<${mem.name} />`}
              title="React components"
            />
          )}

          {reactHooks.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={reactHooks}
              path={path}
              renderMemberName={(mem) => `${mem.name}()`}
              title="React hooks"
            />
          )}

          {classes.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={classes}
              path={path}
              title="Classes"
            />
          )}

          {enums.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={classes}
              path={path}
              title="Enumerations"
            />
          )}

          {functions.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={functions}
              path={path}
              renderMemberName={(mem) => `${mem.name}()`}
              title="Functions"
            />
          )}

          {interfaces.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={interfaces}
              path={path}
              title="Interfaces"
            />
          )}

          {namespaces.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={namespaces}
              path={path}
              title="Namespaces"
            />
          )}

          {typeAliases.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={typeAliases}
              path={path}
              title="Type aliases"
            />
          )}

          {variables.length > 0 && (
            <MemberNavigation
              export={exp}
              fontSize={fontSize}
              members={variables}
              path={path}
              title="Variables"
            />
          )}
        </Stack>
      )}
    </Stack>
  )
}

function NavigationList(props: {
  currentPath: string
  fontSize?: number
  members: SanityArrayItem<APIMember>[]
  packageName: string
  packageScope: string | null
  renderMemberName?: (data: APIMember) => ReactNode
  releaseVersion: string
}) {
  const {
    currentPath,
    fontSize,
    members,
    packageName,
    packageScope,
    releaseVersion,
    renderMemberName,
  } = props

  return (
    <>
      {members.map((mem) => {
        if (mem._type === 'api.namespace') {
          return (
            <Fragment key={mem._key}>
              {mem.members.map((namespaceMember) => {
                return (
                  <MemberLink
                    currentPath={currentPath}
                    data={namespaceMember}
                    fontSize={fontSize}
                    key={namespaceMember._key}
                    namespace={mem}
                    packageName={packageName}
                    packageScope={packageScope}
                    releaseVersion={releaseVersion}
                    renderMemberName={renderMemberName}
                  />
                )
              })}
            </Fragment>
          )
        }

        return (
          <MemberLink
            currentPath={currentPath}
            data={mem}
            fontSize={fontSize}
            key={mem._key}
            packageName={packageName}
            packageScope={packageScope}
            releaseVersion={releaseVersion}
            renderMemberName={renderMemberName}
          />
        )
      })}
    </>
  )
}

function MemberLink(props: {
  currentPath: string
  data: APIMember
  fontSize?: number
  namespace?: APINamespace
  packageName: string
  packageScope: string | null
  releaseVersion: string
  renderMemberName?: (data: APIMember) => ReactNode
}) {
  const {
    currentPath,
    data,
    fontSize = 2,
    namespace,
    packageName,
    packageScope,
    releaseVersion,
    renderMemberName,
  } = props

  const params: TSDocAppParams = useMemo(
    () => ({
      exportPath: data.export.path,
      memberName: data.name,
      packageName,
      packageScope,
      releaseVersion,
    }),
    [data, packageName, packageScope, releaseVersion]
  )

  const linkProps = useMemberLink({params})

  return (
    <Card {...linkProps} as="a" padding={2} pressed={linkProps.href === currentPath} radius={2}>
      <Flex>
        <Box flex={1}>
          <Text size={_fontSize(fontSize, [0, 0, 1])}>
            <UnformattedCode>
              {renderMemberName?.(data) ||
                (namespace ? `${namespace.name}.${data.name}` : data.name)}
            </UnformattedCode>
          </Text>
        </Box>

        {data.releaseTag && data.releaseTag !== 'public' && (
          <Box flex="none">
            <Text size={_fontSize(fontSize, [0, 0, 1])}>
              <ReleaseTag $tag={`@${data.releaseTag}`}>
                <DotIcon />
              </ReleaseTag>
            </Text>
          </Box>
        )}
      </Flex>
    </Card>
  )
}

function MemberNavigation(props: {
  export: TSDocExportData
  fontSize?: number
  members: SanityArrayItem<APIMember>[]
  path: string
  renderMemberName?: (data: APIMember) => ReactNode
  title: ReactNode
}) {
  const {path, export: exp, fontSize = 2, members, renderMemberName, title} = props
  const [expanded, setExpanded] = useState(false)

  return (
    <Stack space={1}>
      <Card as="button" onClick={() => setExpanded((v) => !v)} padding={2} radius={2}>
        <Flex>
          <Box flex={1}>
            <Text size={_fontSize(fontSize, [0, 0, 1])} weight="semibold">
              {title}
            </Text>
          </Box>
          <Text muted size={1}>
            {members.length}
          </Text>
        </Flex>
      </Card>

      <Stack paddingLeft={3} space={1}>
        {expanded && (
          <NavigationList
            currentPath={path}
            fontSize={fontSize}
            members={members}
            packageName={exp.package.name}
            packageScope={exp.package.scope}
            releaseVersion={exp.release.version}
            renderMemberName={renderMemberName}
          />
        )}
      </Stack>
    </Stack>
  )
}
