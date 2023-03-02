import {MasterDetailIcon, MoonIcon, SunIcon} from '@sanity/icons'
import {TSDocNav} from '@sanity/tsdoc/react'
import {Box, Button, Card, Flex, Stack, Text, Tooltip} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import sanityConfig from 'sanity.config'
import {ArticleListData} from './articleList'
import {useApp} from './useApp'

export interface NavProps {
  articleList: ArticleListData
}

export function Nav(props: NavProps) {
  const {articleList} = props
  const {scheme, setScheme} = useApp()
  const {asPath: pathname} = useRouter()
  const view = pathname.startsWith('/reference') ? 'reference' : 'learn'

  return (
    <Flex direction="column" height="fill">
      <Card flex="none" borderBottom>
        <Stack space={2} padding={3}>
          <Flex gap={2} justify="space-between">
            <Box flex="none">
              <Button
                as={Link}
                href="/"
                mode="bleed"
                padding={2}
                text={<strong>{sanityConfig?.title}</strong>}
              />
            </Box>

            <Flex flex="none" gap={2}>
              <Tooltip content={<Text size={1}>Open Studio</Text>} padding={2} portal>
                <Button
                  aria-label="Open Studio"
                  as={Link}
                  href="/studio"
                  icon={MasterDetailIcon}
                  mode="bleed"
                  padding={2}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Tooltip>
              <Tooltip
                content={
                  <Text size={1}>
                    {scheme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
                  </Text>
                }
                padding={2}
                portal
              >
                <Button
                  aria-label={scheme === 'dark' ? 'Toggle light mode' : 'Toggle dark mode'}
                  icon={scheme === 'dark' ? SunIcon : MoonIcon}
                  mode="bleed"
                  onClick={() => setScheme(scheme === 'dark' ? 'light' : 'dark')}
                  padding={2}
                />
              </Tooltip>
            </Flex>
          </Flex>

          <Flex gap={2}>
            <Button
              as={Link}
              fontSize={1}
              href="/"
              mode="bleed"
              padding={2}
              selected={view === 'learn'}
              text="Learn"
            />
            <Button
              as={Link}
              fontSize={1}
              href="/reference"
              mode="bleed"
              padding={2}
              selected={view === 'reference'}
              text="Reference"
            />
          </Flex>
        </Stack>
      </Card>

      <Box flex={1} hidden={view !== 'reference'}>
        <TSDocNav />
      </Box>

      <Box flex={1} hidden={view !== 'learn'}>
        <Stack padding={3} space={2}>
          {articleList.map((a) => (
            <Card
              __unstable_focusRing
              as={Link}
              data-as="a"
              href={`/learn/${a.slug.current}`}
              key={a.slug.current}
              padding={2}
              selected={`/learn/${a.slug.current}` === pathname}
              radius={2}
            >
              <Text size={1} weight="medium">
                {a.headline}
              </Text>
            </Card>
          ))}
        </Stack>
      </Box>
    </Flex>
  )
}
