import {ReactElement} from 'react'
import {useMember, useTSDoc} from '../../app'

import {TSDocArticle} from '../TSDocArticle'

export default function SymbolStory(): ReactElement {
  const tsdoc = useTSDoc()
  const member = useMember({params: tsdoc.params})

  return <>{member.data && <TSDocArticle data={member.data} />}</>
}
