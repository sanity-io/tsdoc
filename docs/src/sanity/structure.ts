import {API_MEMBER_TYPES} from '@sanity/tsdoc/store'
import {StructureResolver} from 'sanity/desk'

const STRUCTURE_HIDDEN_TYPES = API_MEMBER_TYPES.concat(['api.package', 'api.release', 'api.export'])

export const structure: StructureResolver = (S) => {
  const defaultItems = S.documentTypeListItems()

  const visibleDefaultItems = defaultItems.filter((item) => {
    const itemId = item.getId()

    return itemId && !STRUCTURE_HIDDEN_TYPES.includes(itemId)
  })

  return S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('api.package').title('Packages'),
      ...(visibleDefaultItems.length > 0 ? [S.divider()] : []),
      ...visibleDefaultItems,
    ])
}
