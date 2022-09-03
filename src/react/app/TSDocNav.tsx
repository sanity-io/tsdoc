import {Box, Card, Stack} from '@sanity/ui'
import {ReactElement} from 'react'
import {TSDocExportNavigation} from './TSDocPackageListNavigation'
import {TSDocSearch} from './TSDocSearch'
import {useExports} from './useExports'
import {useTSDoc} from './useTSDoc'

/** @public */
export function TSDocNav(): ReactElement {
  const {path} = useTSDoc()
  const exports = useExports()

  return (
    <Card borderRight display={['none', 'none', 'block']} overflow="auto" style={{width: 400}}>
      <Stack padding={3} space={4}>
        <TSDocSearch />

        {exports.data?.map(
          (exp) =>
            exp.members.length > 0 && (
              <Box key={exp.name}>
                <TSDocExportNavigation path={path} data={exp} />
              </Box>
            )
        )}
      </Stack>
    </Card>
  )
}
