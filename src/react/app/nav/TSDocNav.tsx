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
import {ReleaseMenuButton} from './ReleaseMenuButton'
import {SyntaxTreeItem} from './SyntaxTreeItem'
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
export function TSDocNav(): ReactElement {
  return (
    <Size delta={-1}>
      <TSDocNavView />
    </Size>
  )
}

function TSDocNavView(): ReactElement {
  const {params, updateParams} = useTSDoc()
  const _exports = useExports()
  const packages = usePackages()
  const fontSize = useSize()

  const currentPkg = packages.data?.find(
    (p) => p.scope === params.packageScope && p.name === params.packageName
  )

  const currentRelease = currentPkg?.releases.find((r) =>
    params.releaseVersion
      ? r.version === params.releaseVersion
      : r.version == currentPkg.latestRelease.version
  )

  const currentExportName =
    currentPkg &&
    params.exportPath &&
    [currentPkg.scope, currentPkg.name, params.exportPath].filter(Boolean).join('/')

  const exports = useMemo(() => {
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
                <SyntaxTreeItem
                  key={pkg.name}
                  fontSize={fontSize}
                  onClick={() => {
                    updateParams((prev) => ({
                      ...prev,
                      packageScope: pkg.scope || null,
                      packageName: pkg.name,
                      releaseVersion: pkg.latestRelease.version,
                    }))
                  }}
                  padding={2}
                  text={<SyntaxText>{[pkg.scope, pkg.name].filter(Boolean).join('/')}</SyntaxText>}
                />
              ))}
            </Tree>
          </Stack>
        </Card>
      )}

      {currentPkg && (
        <>
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

          {_exports.loading && (
            <Flex align="center" height="fill" justify="center">
              <Spinner muted />
            </Flex>
          )}

          {!_exports.loading && (
            <Stack flex={1} overflow="auto" padding={3} space={3}>
              {currentPkg && <TSDocSearch />}

              {exports.length === 1 && (
                <Tree>
                  {exports[0]?.versions
                    .filter((d) => {
                      return d.release.version === currentRelease?.version
                    })
                    .map((exp) => (
                      <GroupedMembersTree exp={exp} key={exp.release.version} />
                    ))}
                </Tree>
              )}

              {exports.length > 1 && (
                <Tree>
                  {exports
                    .filter((data) =>
                      data.versions.some((v) => v.release.version === currentRelease?.version)
                    )
                    .map((data) => (
                      <TreeItem
                        expanded={data.name === currentExportName}
                        fontSize={fontSize}
                        key={data.name}
                        padding={2}
                        text={<SyntaxText>{data.name}</SyntaxText>}
                        weight="semibold"
                      >
                        {data.versions
                          .filter((d) => d.release.version === currentRelease?.version)
                          .map((exp) => (
                            <GroupedMembersTree exp={exp} key={exp.release.version} />
                          ))}
                      </TreeItem>
                    ))}
                </Tree>
              )}
            </Stack>
          )}
        </>
      )}
    </Flex>
  )
}
