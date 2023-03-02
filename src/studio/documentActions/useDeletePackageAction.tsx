import {TrashIcon} from '@sanity/icons'
import {API_MEMBER_TYPES} from '@sanity/tsdoc/store'
import {Button, Card, Code, Stack, Text} from '@sanity/ui'
import {useCallback, useMemo, useState} from 'react'
import {
  DocumentActionComponent,
  DocumentActionDialogProps,
  Preview,
  useClient,
  useSchema,
} from 'sanity'

export const useDeletePackageAction: DocumentActionComponent = (props) => {
  const {id: documentId} = props
  const [dialogOpen, setDialogOpen] = useState(false)

  const onHandle = useCallback(() => {
    setDialogOpen(true)
  }, [])

  const dialog: DocumentActionDialogProps | null = useMemo(() => {
    if (!dialogOpen) return null

    return {
      type: 'dialog',
      header: 'Delete package',
      content: (
        <DeletePackageDialogContent
          documentId={documentId}
          onComplete={() => setDialogOpen(false)}
        />
      ),
      onClose() {
        setDialogOpen(false)
      },
    }
  }, [dialogOpen, documentId])

  return {
    dialog,
    disabled: dialogOpen,
    icon: TrashIcon,
    label: 'Delete package',
    onHandle,
    tone: 'critical',
  }
}

function DeletePackageDialogContent(props: {documentId: string; onComplete: () => void}) {
  const {documentId, onComplete} = props
  const client = useClient({apiVersion: '2023-01-01'})
  const schema = useSchema()
  const schemaType = schema.get('api.package')!
  const [error, setError] = useState<Error | null>(null)
  const [running, setRunning] = useState(false)
  const previewValue = useMemo(() => ({_type: 'api.package', _id: documentId}), [documentId])

  const handleDelete = useCallback(async () => {
    try {
      setRunning(true)

      await client.delete({
        query: `*[_id == $documentId || (references($documentId) && _type in $types)]`,
        params: {
          documentId,
          types: API_MEMBER_TYPES.concat(['api.release', 'api.export', 'api.symbol']),
        },
      })
      onComplete()
      setRunning(false)
    } catch (err) {
      if (err instanceof Error) setError(err)
      else setError(new Error(String(err)))
      setRunning(false)
    }
  }, [client, documentId, onComplete])

  if (error) {
    return (
      <Stack space={4}>
        <Text>Error: {error.message}</Text>
        <Code size={1}>{error.stack}</Code>
      </Stack>
    )
  }

  return (
    <Stack space={4}>
      <Text>Are you sure you want to delete this package and all related documents?</Text>

      <Card border padding={2} radius={2}>
        <Preview schemaType={schemaType} value={previewValue} />
      </Card>

      <Button
        // disabled={running}
        loading={running}
        onClick={handleDelete}
        text="Yes, delete now"
        tone="critical"
      />
    </Stack>
  )
}
