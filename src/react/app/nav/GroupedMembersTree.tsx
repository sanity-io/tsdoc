import {useSize} from '../../lib/ui'
import {useTSDoc} from '../useTSDoc'
import {MemberLink} from './MemberLink'
import {TreeItemFocus} from './TreeItemFocus'
import {TSDocNavExportData} from './TSDocNav'

export function GroupedMembersTree(props: {
  exp: TSDocNavExportData
  expandSubPackages?: boolean
}): React.ReactNode {
  const {exp, expandSubPackages} = props
  const {params} = useTSDoc()
  const fontSize = useSize()

  return (
    <>
      {exp.reactComponents.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.reactComponents.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Components"
          weight="semibold"
        >
          {exp.reactComponents.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.reactHooks.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.reactHooks.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Hooks"
          weight="semibold"
        >
          {exp.reactHooks.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.classes.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.classes.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Classes"
          weight="semibold"
        >
          {exp.classes.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.functions.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.functions.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Functions"
          weight="semibold"
        >
          {exp.functions.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.variables.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.variables.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Variables"
          weight="semibold"
        >
          {exp.variables.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.enums.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.enums.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Enumerations"
          weight="semibold"
        >
          {exp.enums.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.interfaces.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.interfaces.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Interfaces"
          weight="semibold"
        >
          {exp.interfaces.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.namespaces.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.namespaces.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Namespaces"
          weight="semibold"
        >
          {exp.namespaces.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}

      {exp.typeAliases.length > 0 && (
        <TreeItemFocus
          expanded={
            expandSubPackages
              ? expandSubPackages
              : exp.typeAliases.some((m) => m.name === params.memberName)
          }
          fontSize={fontSize}
          padding={2}
          text="Type aliases"
          weight="semibold"
        >
          {exp.typeAliases.map((member) => (
            <MemberLink data={member} key={member.name} />
          ))}
        </TreeItemFocus>
      )}
    </>
  )
}
