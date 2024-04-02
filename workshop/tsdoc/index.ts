import {WorkshopPlugin} from '@sanity/ui-workshop'

import {TSDocInspector} from './TSDocInspector'
import {TSDocProvider} from './TSDocProvider'

export function tsdocPlugin(): WorkshopPlugin {
  return {
    name: 'tsdoc',
    title: 'TSDoc',
    inspector: TSDocInspector,
    provider: TSDocProvider,
  }
}
