import {Stack} from '@sanity/ui'
import {ReactElement, useMemo} from 'react'
import {TSDocExportData} from '../types'
import {TSDocExportNavigation} from './TSDocPackageListNavigation'
import {TSDocSearch} from './TSDocSearch'
import {useExports} from './useExports'

/** @beta */
export function TSDocNav(): ReactElement {
  const {data} = useExports()

  const exports = useMemo(() => {
    if (!data) return null

    const _exports: {
      packageScope: string | null
      packageName: string
      name: string
      versions: TSDocExportData[]
    }[] = []

    for (const exp of data) {
      if (exp.members.length === 0) {
        continue // skip
      }

      const item = _exports.find(
        (e) =>
          e.packageScope === exp.package.scope &&
          e.packageName === exp.package.name &&
          e.name === exp.name
      )

      if (item) {
        item.versions.push(exp)
      } else {
        _exports.push({
          packageScope: exp.package.scope,
          packageName: exp.package.name,
          name: exp.name,
          versions: [exp],
        })
      }
    }

    return _exports
  }, [data])

  return (
    <Stack padding={3} space={4}>
      <TSDocSearch />

      {exports && (
        <Stack space={1}>
          {exports.map((exp) => (
            <TSDocExportNavigation key={exp.name} name={exp.name} versions={exp.versions} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
