import {useExports, usePackages, useTSDoc} from '@sanity/tsdoc/react'
import {Box, Code, Select, Stack, Text} from '@sanity/ui'
import {useWorkshop} from '@sanity/ui-workshop'
import {ChangeEvent, ReactElement, useCallback} from 'react'
import {TSDocMsg} from './types'

export function TSDocInspector(): ReactElement {
  const {broadcast} = useWorkshop<TSDocMsg>()
  const {params} = useTSDoc()
  const packages = usePackages()
  const exports = useExports()

  const currentPackage = packages.data?.find((pkg) => pkg.name === params.packageName)
  const currentExport = exports.data?.find((exp) => exp.path === params.exportPath)

  const handlePackageNameChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const v = event.currentTarget.value

      const parts = v.split('/')

      let scope: string | undefined = undefined
      let name: string | undefined = ''

      if (parts.length === 2) {
        scope = parts[0]
        name = parts[1]
      } else {
        name = parts[0]
      }

      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          packageName: name,
          packageScope: scope,
          releaseVersion: null,
          exportPath: null,
          memberName: null,
        },
      })
    },
    [broadcast]
  )

  const handleReleaseVersionChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const v = event.currentTarget.value

      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          releaseVersion: v,
          exportPath: null,
          memberName: null,
        },
      })
    },
    [broadcast]
  )

  const handleExportPathChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const v = event.currentTarget.value

      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          exportPath: v,
          memberName: null,
        },
      })
    },
    [broadcast]
  )

  const handleMemberNameChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const v = event.currentTarget.value

      broadcast({
        type: 'workshop/tsdoc/updateParams',
        params: {
          memberName: v,
        },
      })
    },
    [broadcast]
  )

  return (
    <Box padding={2}>
      <Stack padding={3} space={4}>
        <Code hidden language="json" size={0}>
          {JSON.stringify(params, null, 2)}
        </Code>

        <Stack space={2}>
          <Text size={1} weight="semibold">
            Package
          </Text>
          <Select
            fontSize={[2, 2, 1]}
            onChange={handlePackageNameChange}
            padding={2}
            value={params.packageName || ''}
          >
            {packages.data?.map((pkg) => {
              const fullName = [pkg.scope, pkg.name].filter(Boolean).join('/')

              return (
                <option key={fullName} value={fullName}>
                  {fullName}
                </option>
              )
            })}
          </Select>
        </Stack>

        {currentPackage && (
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Release
            </Text>
            <Select
              fontSize={[2, 2, 1]}
              onChange={handleReleaseVersionChange}
              padding={2}
              value={params.packageName || ''}
            >
              {currentPackage.releases?.map((release) => (
                <option key={release.version} value={release.version}>
                  {release.version}
                </option>
              ))}
            </Select>
          </Stack>
        )}

        {exports.data && (
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Export
            </Text>
            <Select
              fontSize={[2, 2, 1]}
              onChange={handleExportPathChange}
              padding={2}
              value={params.exportPath || ''}
            >
              {exports.data.map((exp) => (
                <option key={exp.name} value={exp.path}>
                  {exp.name}
                </option>
              ))}
            </Select>
          </Stack>
        )}

        {currentExport && (
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Member
            </Text>
            <Select
              fontSize={[2, 2, 1]}
              onChange={handleMemberNameChange}
              padding={2}
              value={params.memberName || ''}
            >
              {currentExport.members.map((mem) => (
                <option key={mem.name} value={mem.name}>
                  {mem.name}
                </option>
              ))}
            </Select>
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
