import {useMember, useTSDoc} from '../../app'
import {TSDocArticle} from '../TSDocArticle'

export default function SymbolStory(): React.ReactNode {
  const tsdoc = useTSDoc()
  const member = useMember({params: tsdoc.params})

  return (
    <>
      {member.data && member.data.map((member) => <TSDocArticle key={member._id} data={member} />)}
    </>
  )
}
