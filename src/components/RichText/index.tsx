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

import React from 'react'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { ImageBlockComponent } from '@/blocks/ImageBlock/Component'
import { VideoBlockComponent } from '@/blocks/VideoBlock/Component'
import { BlockquoteBlockComponent } from '@/blocks/Blockquote/Component'
import { ConclusionBlockComponent } from '@/blocks/Conclusion/Component'
import { Media } from '@/components/Media'

import type { ImageBlock as ImageBlockProps, VideoBlock as VideoBlockProps, StatsBlock as StatsBlockProps, BlockquoteBlock as BlockquoteBlockProps, ConclusionBlock as ConclusionBlockProps, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import type { SerializedTypographyStyleNode } from '@/lexical/typography/TypographyStyleNode'
import { getPagePath } from '@/utilities/getPagePath'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CodeBlockProps | ImageBlockProps | VideoBlockProps | StatsBlockProps | BlockquoteBlockProps | ConclusionBlockProps>
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
    statsBlock: ({ node }) => {
      const { stats } = node.fields as StatsBlockProps
      if (!stats || stats.length === 0) return null
      return (
        <div className="col-start-1 col-span-3 border-t border-brand-gray-light pt-10 pb-10 border-b">
          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col gap-4">
                {stat.icon && typeof stat.icon === 'object' && (
                  <div className="h-[42px] w-auto">
                    <Media
                      resource={stat.icon}
                      className="h-full w-auto object-contain"
                      htmlElement={null}
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-sans font-semibold text-brand-black leading-snug">
                    {stat.value}
                  </p>
                  {stat.description && (
                    <p className="text-base font-sans text-brand-black leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
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
