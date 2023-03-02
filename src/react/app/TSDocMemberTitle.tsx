import {APIMember} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {SyntaxText} from '../components/ColoredCode'
import {UnformattedCode} from '../components/UnformattedCode'

/** @beta */
export function TSDocMemberTitle(props: {data: APIMember}): ReactElement {
  const {data} = props
  const isDeprecated = Boolean(data.comment?.deprecated)

  if ('isReactComponentType' in data && data.isReactComponentType) {
    return (
      <>
        <UnformattedCode>{`<`}</UnformattedCode>
        <SyntaxText $deprecated={isDeprecated} $syntax="className">
          {data.name}
        </SyntaxText>
        <UnformattedCode $deprecated={isDeprecated}>{` />`}</UnformattedCode>
      </>
    )
  }

  if (data._type === 'api.class') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">class </SyntaxText> */}
        <SyntaxText $deprecated={isDeprecated} $syntax="className">
          {data.name}
        </SyntaxText>
      </>
    )
  }

  if (data._type === 'api.enum') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">enum </SyntaxText> */}
        <SyntaxText $deprecated={isDeprecated} $syntax="className">
          {data.name}
        </SyntaxText>
      </>
    )
  }

  if (data._type === 'api.function') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">function </SyntaxText> */}
        <SyntaxText $deprecated={isDeprecated} $syntax="function">
          {data.name}
        </SyntaxText>
        <UnformattedCode $deprecated={isDeprecated}>()</UnformattedCode>
      </>
    )
  }

  if (data._type === 'api.interface') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">interface </SyntaxText> */}
        <SyntaxText $deprecated={isDeprecated} $syntax="className">
          {data.name}
        </SyntaxText>
      </>
    )
  }

  if (data._type === 'api.namespace') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">namespace </SyntaxText> */}
        <SyntaxText $deprecated={isDeprecated} $syntax="className">
          {data.name}
        </SyntaxText>
      </>
    )
  }

  if (data._type === 'api.typeAlias') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">type </SyntaxText> */}
        <SyntaxText $deprecated={isDeprecated} $syntax="className">
          {data.name}
        </SyntaxText>
      </>
    )
  }

  if (data._type === 'api.variable') {
    return <UnformattedCode $deprecated={isDeprecated}>{data.name}</UnformattedCode>
  }

  return <>Uknown</>
}
