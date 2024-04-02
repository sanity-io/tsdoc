import {
  DocBlockTag,
  DocCodeSpan,
  DocComment,
  DocErrorText,
  DocEscapedText,
  DocFencedCode,
  DocLinkTag,
  DocMemberIdentifier,
  DocMemberReference,
  DocNode,
  DocNodeTransforms,
  DocParagraph,
  DocPlainText,
  DocSection,
  StandardTags,
} from '@microsoft/tsdoc'

import {PortableTextNode, PortableTextSpanNode} from '../_lib/portable-text'
import {SanityArrayItem} from '../_lib/sanity'
import {
  TSDocComment,
  TSDocCustomBlock,
  TSDocDeprecatedBlock,
  TSDocExampleBlock,
  TSDocModifierTag,
  TSDocParamBlock,
  TSDocRemarksBlock,
  TSDocReturnsBlock,
  TSDocSeeBlock,
} from '../types'
import {_isArray, _isRecord} from './helpers'

/** Regex pattern that matches Markdown headers: h1 - h6 */
const RE_MARKDOWN_HEADER = /^([#]{1,6})\s(.*)$/

/**
 * @internal
 */
function _transformDocNode(docNode: DocNode): PortableTextNode | undefined {
  // Block = "Block",
  // BlockTag = "BlockTag",
  // Excerpt = "Excerpt",
  // FencedCode = "FencedCode",
  // CodeSpan = "CodeSpan",
  // Comment = "Comment",
  // DeclarationReference = "DeclarationReference",
  // ErrorText = "ErrorText",
  // EscapedText = "EscapedText",
  // HtmlAttribute = "HtmlAttribute",
  // HtmlEndTag = "HtmlEndTag",
  // HtmlStartTag = "HtmlStartTag",
  // InheritDocTag = "InheritDocTag",
  // InlineTag = "InlineTag",
  // LinkTag = "LinkTag",
  // MemberIdentifier = "MemberIdentifier",
  // MemberReference = "MemberReference",
  // MemberSelector = "MemberSelector",
  // MemberSymbol = "MemberSymbol",
  // Paragraph = "Paragraph",
  // ParamBlock = "ParamBlock",
  // ParamCollection = "ParamCollection",
  // PlainText = "PlainText",
  // Section = "Section",
  // SoftBreak = "SoftBreak"

  if (docNode.kind === 'CodeSpan') {
    return {
      _type: 'span',
      marks: ['code'],
      text: (docNode as DocCodeSpan).code,
    }
  }

  if (docNode.kind === 'ErrorText') {
    return {
      _type: 'span',
      marks: [],
      text: (docNode as DocErrorText).text,
    }
  }

  if (docNode.kind === 'EscapedText') {
    return {
      _type: 'span',
      marks: [],
      text: (docNode as DocEscapedText).decodedText,
    }
  }

  if (docNode.kind === 'FencedCode') {
    const node = docNode as DocFencedCode

    return {
      _type: 'code',
      code: node.code,
      language: node.language,
    }
  }

  if (docNode.kind === 'LinkTag') {
    const linkTag: DocLinkTag = docNode as DocLinkTag

    if (linkTag.urlDestination) {
      const linkText: string = linkTag.linkText || linkTag.urlDestination

      return {
        _type: 'span',
        _markDef: {
          _type: 'link',
          href: linkTag.urlDestination,
        },
        marks: [],
        text: linkText,
      }
    } else {
      let identifier = ''
      let fullReferenceURL = ''

      if (linkTag.codeDestination) {
        // @todo: the library should provide a default rendering for this
        const memberReferences: ReadonlyArray<DocMemberReference> =
          linkTag.codeDestination.memberReferences

        if (memberReferences.length > 0) {
          const memberIdentifier: DocMemberIdentifier | undefined =
            memberReferences[memberReferences.length - 1]?.memberIdentifier

          fullReferenceURL = memberReferences
            .map((memberReference) => memberReference.memberIdentifier?.identifier)
            .filter((identifier) => Boolean(identifier))
            .join('/')

          if (memberIdentifier) {
            identifier = memberIdentifier.identifier
          }
        }
      }

      const linkText: string = linkTag.linkText || identifier || '???'

      return {
        _type: 'span',
        _markDef: {
          _type: 'link',
          href: fullReferenceURL,
        },
        marks: [],
        text: linkText,
      }
    }
  }

  if (docNode.kind === 'Paragraph') {
    const transformedParagraph: DocParagraph = DocNodeTransforms.trimSpacesInParagraph(
      docNode as DocParagraph,
    )

    if (
      transformedParagraph.nodes.length === 1 &&
      transformedParagraph.nodes[0]?.kind === 'SoftBreak'
    ) {
      return undefined
    }

    const children = _transformDocCommentContent(transformedParagraph)

    if (!children) return undefined

    // Find mark defs
    const markDefs: SanityArrayItem<PortableTextSpanNode['_markDef']>[] = []

    let style = 'normal'

    // Check if the first span starts with a Markdown header prefix (#)
    if (children[0]?._type === 'span') {
      const headerMatch = RE_MARKDOWN_HEADER.exec(children[0].text)

      if (headerMatch) {
        const child: SanityArrayItem<PortableTextNode> = {
          ...children[0],
          text: headerMatch[2]!,
        }

        style = `h${headerMatch[1]?.length}`

        children[0] = child
      }
    }

    for (const child of children) {
      if (child._type === 'span' && _isRecord(child._markDef)) {
        const markDefKey = `${child._markDef._type}${markDefs.length}`

        child._markDef._key = markDefKey

        if (_isArray(child.marks)) {
          child.marks.push(markDefKey)
        }

        markDefs.push({_key: markDefKey, ...child._markDef})

        delete child._markDef
      }
    }

    if (children.length === 0) {
      children.push({
        _type: 'span',
        _key: '0',
        marks: [],
        text: '',
      })
    }

    return {
      _type: 'block',
      style,
      children,
      markDefs,
    }
  }

  if (docNode.kind === 'PlainText') {
    return {
      _type: 'span',
      marks: [],
      text: (docNode as DocPlainText).text,
    }
  }

  if (docNode.kind === 'SoftBreak') {
    return {
      _type: 'span',
      text: '\n',
    }
  }

  if (docNode.kind === 'BlockTag') {
    const node = docNode as DocBlockTag

    return {
      _type: 'span',
      marks: [],
      text: node.tagName,
    }
  }

  throw new Error(`unknown doc node type: ${docNode.kind}`)
}

export function _transformDocCommentContent(
  section: DocSection | DocParagraph,
): SanityArrayItem<PortableTextNode>[] | undefined {
  if (!section.nodes.length) return undefined

  const nodes: SanityArrayItem<PortableTextNode>[] = section.nodes
    .map((node, idx) => {
      if (idx === 0 && node.kind === 'SoftBreak') {
        return undefined
      }

      const transformedNode = _transformDocNode(node)

      return transformedNode && {_key: `node${idx}`, ...transformedNode}
    })
    .filter(Boolean) as SanityArrayItem<PortableTextNode>[]

  return nodes.length ? nodes : undefined
}

export function _transformDocComment(docComment: DocComment): TSDocComment {
  // Summary
  const summary = _transformDocCommentContent(docComment.summarySection)

  // Parameters
  const parameters: SanityArrayItem<TSDocParamBlock>[] | undefined = docComment.params.blocks.length
    ? docComment.params.blocks.map((paramBlock, idx) => ({
        _type: 'tsdoc.paramBlock',
        _key: `paramBlock${idx}`,
        name: paramBlock.parameterName,
        content: _transformDocCommentContent(paramBlock.content),
      }))
    : undefined

  // Returns
  const returns: TSDocReturnsBlock | undefined = docComment.returnsBlock && {
    _type: 'tsdoc.returnsBlock',
    content: _transformDocCommentContent(docComment.returnsBlock.content),
  }

  // `@remarks` block
  const remarks: TSDocRemarksBlock | undefined = docComment.remarksBlock && {
    _type: 'tsdoc.remarksBlock',
    content: _transformDocCommentContent(docComment.remarksBlock.content),
  }

  const exampleBlocks: SanityArrayItem<TSDocExampleBlock>[] = []
  const customBlocks: SanityArrayItem<TSDocCustomBlock>[] = []

  // Custom blocks
  for (let i = 0; i < docComment.customBlocks.length; i += 1) {
    const customBlock = docComment.customBlocks[i]!

    // This is a `@example` block
    if (customBlock.blockTag.tagNameWithUpperCase === StandardTags.example.tagNameWithUpperCase) {
      exampleBlocks.push({
        _type: 'tsdoc.exampleBlock',
        _key: `exampleBlock${i}`,
        content: _transformDocCommentContent(customBlock.content),
      })
    } else {
      customBlocks.push({
        _type: 'tsdoc.customBlock',
        _key: `customBlock${i}`,
        tag: customBlock.blockTag.tagName,
        content: _transformDocCommentContent(customBlock.content),
      })
    }
  }

  // `@see` blocks
  const seeBlocks: SanityArrayItem<TSDocSeeBlock>[] | undefined = docComment.seeBlocks.length
    ? docComment.seeBlocks.map((seeBlock, idx) => ({
        _type: 'tsdoc.seeBlock',
        _key: `seeBlock${idx}`,
        content: _transformDocCommentContent(seeBlock.content),
      }))
    : undefined

  // `@deprecated` block
  const deprecated: TSDocDeprecatedBlock | undefined = docComment.deprecatedBlock && {
    _type: 'tsdoc.deprecatedBlock',
    content: _transformDocCommentContent(docComment.deprecatedBlock.content),
  }

  // Modifiers
  const modifierTags: SanityArrayItem<TSDocModifierTag>[] | undefined = docComment.modifierTagSet
    .nodes.length
    ? docComment.modifierTagSet.nodes.map((modifierTag, idx) => ({
        _type: 'tsdoc.modifierTag',
        _key: `modifierTag${idx}`,
        name: modifierTag.tagName,
      }))
    : undefined

  return {
    _type: 'tsdoc.docComment',
    customBlocks: customBlocks.length > 0 ? customBlocks : undefined,
    deprecated,
    exampleBlocks: exampleBlocks.length > 0 ? exampleBlocks : undefined,
    modifierTags,
    parameters,
    remarks,
    returns,
    seeBlocks,
    summary,
  }
}
