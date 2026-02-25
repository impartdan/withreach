import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { ImageBlockComponent } from '@/blocks/ImageBlock/Component'
import { VideoBlockComponent } from '@/blocks/VideoBlock/Component'
import { BlockquoteBlockComponent } from '@/blocks/Blockquote/Component'
import { ConclusionBlockComponent } from '@/blocks/Conclusion/Component'

import type { BannerBlock as BannerBlockProps, ImageBlock as ImageBlockProps, VideoBlock as VideoBlockProps, BlockquoteBlock as BlockquoteBlockProps, ConclusionBlock as ConclusionBlockProps, Page } from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { cn } from '@/utilities/ui'
import type { SerializedTypographyStyleNode } from '@/lexical/typography/TypographyStyleNode'
import { getPagePath } from '@/utilities/getPagePath'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<BannerBlockProps | CodeBlockProps | ImageBlockProps | VideoBlockProps | BlockquoteBlockProps | ConclusionBlockProps>
  | SerializedTypographyStyleNode

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  if (relationTo === 'pages') {
    return getPagePath(value as unknown as Page)
  }
  return `/${relationTo}/${value.slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  typographyStyle: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children })
    if (!children?.length) {
      return (
        <p className={node.typographyStyle}>
          <br />
        </p>
      )
    }
    return <p className={node.typographyStyle}>{children}</p>
  },
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    imageBlock: ({ node }) => (
      <div className="col-start-1 col-span-3 my-4">
        <ImageBlockComponent {...node.fields} />
      </div>
    ),
    videoBlock: ({ node }) => (
      <div className="col-start-1 col-span-3 my-4">
        <VideoBlockComponent {...node.fields} />
      </div>
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    blockquote: ({ node }) => (
      <BlockquoteBlockComponent className="col-start-2" {...node.fields} />
    ),
    conclusion: ({ node }) => (
      <ConclusionBlockComponent className="col-start-2" {...node.fields} />
    ),
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto wysiwyg': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
