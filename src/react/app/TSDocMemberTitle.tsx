import {APIMember} from '@sanity/tsdoc'
import {ReactElement} from 'react'
import {SyntaxText} from '../components/ColoredCode'
import {UnformattedCode} from '../components/UnformattedCode'

/** @beta */
export function TSDocMemberTitle(props: {data: APIMember}): ReactElement {
  const {data} = props

  if ('isReactComponentType' in data && data.isReactComponentType) {
    return (
      <>
        <UnformattedCode>{`<`}</UnformattedCode>
        <SyntaxText $syntax="className">{data.name}</SyntaxText>
        <UnformattedCode>{` />`}</UnformattedCode>
      </>
    )
  }

  if (data._type === 'api.class') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">class </SyntaxText> */}
        <SyntaxText $syntax="className">{data.name}</SyntaxText>
      </>
    )
  }

  if (data._type === 'api.enum') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">enum </SyntaxText> */}
        <SyntaxText $syntax="className">{data.name}</SyntaxText>
      </>
    )
  }

  if (data._type === 'api.function') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">function </SyntaxText> */}
        <SyntaxText $syntax="function">{data.name}</SyntaxText>
        <UnformattedCode>()</UnformattedCode>
      </>
    )
  }

  if (data._type === 'api.interface') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">interface </SyntaxText> */}
        <SyntaxText $syntax="className">{data.name}</SyntaxText>
      </>
    )
  }

  if (data._type === 'api.namespace') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">namespace </SyntaxText> */}
        <SyntaxText $syntax="className">{data.name}</SyntaxText>
      </>
    )
  }

  if (data._type === 'api.typeAlias') {
    return (
      <>
        {/* <SyntaxText $syntax="keyword">type </SyntaxText> */}
        <SyntaxText $syntax="className">{data.name}</SyntaxText>
      </>
    )
  }

  if (data._type === 'api.variable') {
    return <UnformattedCode>{data.name}</UnformattedCode>
  }

  return <>Uknown</>
}
