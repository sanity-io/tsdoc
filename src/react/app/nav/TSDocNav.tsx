import {
  APIClass,
  APIEnum,
  APIFunction,
  APIInterface,
  APINamespace,
  APITypeAlias,
  APIVariable,
} from '@sanity/tsdoc'
import {TSDocExportData} from '@sanity/tsdoc/store'
import {Box, Card, Flex, Layer, Spinner, Stack, Text, Tree, TreeItem} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {SyntaxText} from '../../components/ColoredCode'
import {Size, useSize} from '../../lib/ui'
import {useExports} from '../useExports'
import {usePackages} from '../usePackages'
import {useTSDoc} from '../useTSDoc'
import {getGroupedMembers} from './getGroupedMembers'
import {GroupedMembersTree} from './GroupedMembersTree'
import {PackageMenuButton} from './PackageMenuButton'
import {PackageTreeItem} from './PackageTreeItem'
import {ReleaseMenuButton} from './ReleaseMenuButton'
import {TSDocSearch} from './TSDocSearch'

/** @internal */
export interface TSDocNavGroupedMembers {
  classes: APIClass[]
  enums: APIEnum[]
  functions: APIFunction[]
  interfaces: APIInterface[]
  namespaces: APINamespace[]
  reactComponents: (APIClass | APIFunction | APIVariable)[]
  reactHooks: APIFunction[]
  typeAliases: APITypeAlias[]
  variables: APIVariable[]
}

/** @internal */
export interface TSDocNavExportData
  extends Omit<TSDocExportData, 'members'>,
    TSDocNavGroupedMembers {
  // intentionally empty
}

/** @beta */
export function TSDocNav(props: {
  showVersionMenu?: boolean
  expandPackages?: boolean
  expandSubPackages?: boolean
}): ReactElement {
  return (
    <Size delta={-1}>
      <TSDocNavView {...props} />
    </Size>
  )
}

interface ExportData {
  packageScope: string | null
  packageName: string
  name: string
  versions: TSDocNavExportData[]
}

function TSDocNavView(props: {
  showVersionMenu?: boolean
  expandPackages?: boolean
  expandSubPackages?: boolean
}): ReactElement {
  const {params} = useTSDoc()
  const _exports = useExports()
  const packages = usePackages()
  const fontSize = useSize()
  const {showVersionMenu, expandPackages, expandSubPackages} = props

  const currentPkg = packages.data?.find(
    (p) => p.scope === params.packageScope && p.name === params.packageName
  )

  const currentRelease = currentPkg?.releases.find((r) =>
    params.releaseVersion
      ? r.version === params.releaseVersion
      : r.version == currentPkg.latestRelease.version
  )

  const currentVersion = currentRelease?.version

  const currentExportName =
    currentPkg &&
    params.exportPath &&
    [currentPkg.scope, currentPkg.name, params.exportPath].filter(Boolean).join('/')

  const exports: ExportData[] = useMemo(() => {
    if (!_exports.data) return []

    const items: {
      packageScope: string | null
      packageName: string
      name: string
      versions: TSDocNavExportData[]
    }[] = []

    for (const exp of _exports.data) {
      if (exp.members.length === 0) {
        continue // skip
      }

      const {members, name, package: pkg, ...restExp} = exp

      const item = items.find(
        (e) => e.packageScope === pkg.scope && e.packageName === pkg.name && e.name === exp.name
      )

      const data: TSDocNavExportData = {
        name,
        package: pkg,
        ...restExp,
        ...getGroupedMembers(members),
      }

      if (item) {
        item.versions.push(data)
      } else {
        items.push({
          packageScope: pkg.scope,
          packageName: pkg.name,
          name,
          versions: [data],
        })
      }
    }

    return items || []
  }, [_exports.data])

  return (
    <Flex direction="column" height="fill" overflow="hidden">
      {!currentPkg && (
        <Card overflow="auto" padding={3}>
          <Stack space={1}>
            <Box padding={2}>
              <Text size={fontSize} weight="bold">
                Choose package
              </Text>
            </Box>

            <Tree>
              {packages.data?.map((pkg) => (
                <PackageTreeItem key={pkg.name} pkg={pkg} fontSize={fontSize} padding={2} />
              ))}
            </Tree>
          </Stack>
        </Card>
      )}

      {currentPkg && (
        <>
          {showVersionMenu && (
            <Layer style={{flex: 'none', position: 'sticky', top: 0}}>
              <Card padding={[2, 2, 3]} shadow={1}>
                <Flex gap={1}>
                  {packages.data && (
                    <Stack flex={1}>
                      <PackageMenuButton currentPkg={currentPkg} packages={packages.data} />
                    </Stack>
                  )}

                  {currentRelease && (
                    <Stack flex="none">
                      <ReleaseMenuButton currentPkg={currentPkg} currentRelease={currentRelease} />
                    </Stack>
                  )}
                </Flex>
              </Card>
            </Layer>
          )}

          {_exports.loading && (
            <Flex align="center" height="fill" justify="center">
              <Spinner muted />
            </Flex>
          )}

          {!_exports.loading && (
            <Stack flex={1} overflow="auto" padding={3} space={3}>
              {currentPkg && <TSDocSearch />}

              {exports.length === 1 ? (
                <SingleExportTree currentVersion={currentVersion} exp={exports[0]!} />
              ) : (
                <MultiExportTree
                  currentExportName={currentExportName}
                  currentVersion={currentVersion}
                  exports={exports}
                  fontSize={fontSize}
                  expandPackages={expandPackages}
                  expandSubPackages={expandSubPackages}
                />
              )}
            </Stack>
          )}
        </>
      )}
    </Flex>
  )
}

function SingleExportTree(props: {currentVersion?: string; exp: ExportData}) {
  const {currentVersion, exp} = props

  const versionedExports = useMemo(
    () => exp.versions.filter((d) => d.release.version === currentVersion),
    [currentVersion, exp]
  )

  return (
    <Tree>
      {versionedExports.map((exp) => (
        <GroupedMembersTree exp={exp} key={exp.release.version} />
      ))}
    </Tree>
  )
}

function MultiExportTree(props: {
  currentExportName?: string | null
  currentVersion?: string
  fontSize?: number[]
  exports: ExportData[]
  expandPackages?: boolean
  expandSubPackages?: boolean
}) {
  const {currentExportName, currentVersion, fontSize, exports, expandPackages, expandSubPackages} =
    props

  const versionedExports = useMemo(
    () => exports.filter((data) => data.versions.some((v) => v.release.version === currentVersion)),
    [currentVersion, exports]
  )

  return (
    <Tree style={{overflow: 'scroll', height: '100vh'}}>
      {versionedExports.map((data) => (
        <TreeItem
          expanded={expandPackages ? expandPackages : data.name === currentExportName}
          fontSize={fontSize}
          key={data.name}
          padding={2}
          text={<SyntaxText>{data.name}</SyntaxText>}
          weight="semibold"
        >
          {data.versions
            .filter((d) => d.release.version === currentVersion)
            .map((exp) => (
              <GroupedMembersTree
                exp={exp}
                key={exp.release.version}
                expandSubPackages={expandSubPackages}
              />
            ))}
        </TreeItem>
      ))}
    </Tree>
  )
}
