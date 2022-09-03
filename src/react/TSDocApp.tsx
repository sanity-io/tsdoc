import {TransformResult} from '@sanity/tsdoc'
import {Box, Card, Code, Flex, Stack, Text} from '@sanity/ui'
import {parse, evaluate} from 'groq-js'
import {History} from 'history'
import {Fragment, ReactElement, useCallback, useEffect, useMemo, useState} from 'react'
import {ReferenceArticle} from './components'
import {RenderLinkCallback} from './TSDocContext'
import {TSDocProvider} from './TSDocProvider'
import {TSDocAppParams} from './types'
import {useExports} from './useExports'
import {useMember} from './useMember'

function getPath(params: TSDocAppParams) {
  return (
    '/' +
    [
      params.packageScope,
      params.packageName,
      params.releaseVersion,
      params.exportPath === '.' ? 'index' : params.exportPath,
      params.memberName,
    ]
      .filter(Boolean)
      .join('/')
  )
}

/** @public */
export interface TSDocAppProps {
  docs: TransformResult
  history: History
}

/**
 * @example
 * ```tsx
 * import {TransformResult} from '@sanity/tsdoc'
 * import {TSDocApp} from '@sanity/tsdoc/react'
 * import {createBrowserHistory} from 'history'
 *
 * const docs: TransformResult = []
 * const history = createBrowserHistory()
 *
 * <TSDocApp docs={docs} history={history} />
 * ```
 *
 * @public
 * */
export function TSDocApp(props: TSDocAppProps): ReactElement {
  const {docs, history} = props

  const query = useCallback(
    async (q: string, params: Record<string, unknown>) => {
      const tree = parse(q)

      const value = await evaluate(tree, {
        dataset: docs,
        params,
      })

      return await value.get()
    },
    [docs]
  )

  const exports = useExports({query})

  const [currentPath, setCurrentPath] = useState(() => history.location.pathname)

  const params: TSDocAppParams | null = useMemo(() => {
    const segments = currentPath.split('/').filter(Boolean)

    if (segments.length === 0) return null

    const hasScope = segments[0].slice(0, 1) === '@'
    const packageScope = (hasScope && segments.shift()) || null
    const packageName = segments[0]
    const releaseVersion = segments[1]
    const exportPath = segments[2] === 'index' ? '.' : segments[2]
    const memberName = segments[3]

    return {
      exportPath,
      memberName,
      packageName,
      packageScope,
      releaseVersion,
    }
  }, [currentPath])

  const member = useMember({query, params})

  const renderLink: RenderLinkCallback = useCallback(
    (linkProps) => {
      const params = linkProps.params
      const href = getPath(params)

      return (
        <a
          href={href}
          onClick={(event) => {
            event.preventDefault()

            setCurrentPath(href)
          }}
        >
          {linkProps.children}
        </a>
      )
    },
    [history]
  )

  useEffect(
    () =>
      history.listen((update) => {
        setCurrentPath(update.location.pathname)
      }),
    [history]
  )

  useEffect(() => {
    history.push({pathname: currentPath})
  }, [currentPath, history])

  return (
    <TSDocProvider renderLink={renderLink}>
      <Flex height="fill">
        <Card borderRight overflow="auto">
          <Stack paddingX={3} paddingY={4} space={4}>
            {exports.data?.map((exp) => (
              <Box key={exp.name}>
                <Stack space={1}>
                  <Box padding={2}>
                    <Text size={1} weight="bold">
                      <code style={{backgroundColor: 'transparent', color: 'inherit'}}>
                        {exp.name} <span style={{color: '#09f'}}>v{exp.release.version}</span>
                      </code>
                    </Text>
                  </Box>

                  {exp.members
                    // .filter((mem) => mem._type === 'api.typeAlias')
                    .map((mem) => {
                      const href = getPath({
                        exportPath: mem.export.path,
                        memberName: mem.name,
                        packageName: exp.package.name,
                        packageScope: exp.package.scope,
                        releaseVersion: exp.release.version,
                      })

                      if (mem._type === 'api.namespace') {
                        return (
                          <Fragment key={mem._key}>
                            {mem.members.map((namespaceMember) => {
                              const namespaceHref = `${href}.${namespaceMember.name}`

                              return (
                                <Card
                                  as="button"
                                  key={namespaceHref}
                                  onClick={() => {
                                    // setCurrentPath(href)
                                  }}
                                  padding={2}
                                  pressed={namespaceHref === currentPath}
                                >
                                  <Code size={1}>
                                    {mem.name}.{namespaceMember.name}
                                  </Code>
                                </Card>
                              )
                            })}
                          </Fragment>
                        )
                      }

                      return (
                        <Card
                          as="button"
                          key={mem._key}
                          onClick={() => {
                            setCurrentPath(href)
                          }}
                          padding={2}
                          pressed={href === currentPath}
                        >
                          <Code size={1}>{mem.name}</Code>
                        </Card>
                      )
                    })}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Card>

        <Card flex={1} overflow="auto">
          <Box padding={4}>
            {member.data && <ReferenceArticle data={member.data} />}

            {/* <Code language="json" size={1}>
              {JSON.stringify(member.data, null, 2)}
            </Code> */}
          </Box>
        </Card>
      </Flex>
    </TSDocProvider>
  )
}
