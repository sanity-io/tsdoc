import {TreeItem} from '@sanity/ui'
import {ReactElement} from 'react'
import {useSize} from '../../lib/ui'
import {useTSDoc} from '../useTSDoc'
import {MemberLink} from './MemberLink'
import {TSDocNavExportData} from './TSDocNav'

export function GroupedMembersTree(props: {exp: TSDocNavExportData}): ReactElement {
  const {exp} = props
  const {params} = useTSDoc()
  const fontSize = useSize()

  return (
    <>
      {exp.reactComponents.length > 0 && (
        <TreeItem
          expanded={exp.reactComponents.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Components"
          weight="semibold"
        >
          {exp.reactComponents.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.reactHooks.length > 0 && (
        <TreeItem
          expanded={exp.reactHooks.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Hooks"
          weight="semibold"
        >
          {exp.reactHooks.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.classes.length > 0 && (
        <TreeItem
          expanded={exp.classes.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Classes"
          weight="semibold"
        >
          {exp.classes.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.functions.length > 0 && (
        <TreeItem
          expanded={exp.functions.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Functions"
          weight="semibold"
        >
          {exp.functions.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.variables.length > 0 && (
        <TreeItem
          expanded={exp.variables.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Variables"
          weight="semibold"
        >
          {exp.variables.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.enums.length > 0 && (
        <TreeItem
          expanded={exp.enums.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Enumerations"
          weight="semibold"
        >
          {exp.enums.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.interfaces.length > 0 && (
        <TreeItem
          expanded={exp.interfaces.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Interfaces"
          weight="semibold"
        >
          {exp.interfaces.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.namespaces.length > 0 && (
        <TreeItem
          expanded={exp.namespaces.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Namespaces"
          weight="semibold"
        >
          {exp.namespaces.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}

      {exp.typeAliases.length > 0 && (
        <TreeItem
          expanded={exp.typeAliases.some((m) => m.name === params.memberName)}
          fontSize={fontSize}
          padding={2}
          text="Type aliases"
          weight="semibold"
        >
          {exp.typeAliases.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItem>
      )}
    </>
  )
}
